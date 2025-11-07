"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import VideoBar from "./VideoBar";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { useAuth } from "@/context/AuthContext";
import { percentToSeconds } from "@/help/videoHelper";
import { Server } from "@/types/detail";

interface WatchPlayerProps {
  title: string;
  slug: string;
  embedUrl?: string;
  servers?: Array<Server>;
}

export default function WatchPlayer({
  title,
  slug,
  embedUrl,
  servers = [],
}: WatchPlayerProps) {
  const [m3u8Url, setM3u8Url] = useState<string | null>(embedUrl);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [selectedServerIndex, setSelectedServerIndex] = useState<number>(0);
  const playerRef = useRef<HTMLDivElement>(null);
  const artPlayerRef = useRef<Artplayer | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumePercentRef = useRef<number | null>(null);
  const resumeTimeRef = useRef<number | null>(null);

  const [showResumeModal, setShowResumeModal] = useState(false);

  const { authUser } = useAuth();
  const lastSentPercentRef = useRef<number | null>(null);

  useEffect(() => {
    // Khi danh sách server hoặc lựa chọn thay đổi, cập nhật URL phát
    if (servers && servers.length > 0) {
      const idx = Math.min(
        Math.max(selectedServerIndex, 0),
        servers.length - 1
      );
      const nextUrl = servers[idx]?.linkM3u8 || embedUrl;
      setM3u8Url(nextUrl);
      setVideoError(null);
      setUseFallback(false);
    } else {
      setM3u8Url(embedUrl);
    }
  }, [selectedServerIndex, servers, embedUrl]);

  const sendProgress = (percent: number) => {
    if (!authUser) return;

    if (lastSentPercentRef.current === percent) return;
    if (percent === 0) return;

    lastSentPercentRef.current = percent;
  };

  const handleResume = () => {
    setShowResumeModal(false);

    if (artPlayerRef.current) {
      const artInst: any = artPlayerRef.current;
      const doSeekAndPlay = () => {
        if (
          resumeTimeRef.current === null &&
          resumePercentRef.current !== null &&
          artInst.duration > 0
        ) {
          resumeTimeRef.current = percentToSeconds(
            resumePercentRef.current,
            artInst.duration
          );
        }
        if (resumeTimeRef.current !== null && artInst.duration > 0) {
          const seekTime = resumeTimeRef.current!;
          artInst.currentTime = seekTime;
          artInst.play?.().catch(() => {});
        }
      };

      if (artInst.duration > 0) {
        doSeekAndPlay();
      } else {
        artInst.once?.("ready", doSeekAndPlay);
        artInst.once?.("canplay", doSeekAndPlay);
      }
    }
  };

  const handleDismissResume = () => {
    sendProgress(0);
    if (artPlayerRef.current) {
      const artInst: any = artPlayerRef.current;
      artInst.currentTime = 0;
      artInst.play?.().catch(() => {});
    }
    setShowResumeModal(false);
  };

  useEffect(() => {
    if (!m3u8Url || !playerRef.current) return;

    if (artPlayerRef.current) {
      artPlayerRef.current.destroy();
    }

    if (Hls.isSupported()) {
      const art = new Artplayer({
        container: playerRef.current,
        url: m3u8Url,
        volume: 0.5,
        autoplay: false,
        autoSize: false,
        autoMini: true,
        screenshot: true,
        setting: true,
        loop: false,
        flip: true,
        playbackRate: true,
        aspectRatio: true,
        fullscreen: true,
        fullscreenWeb: true,
        miniProgressBar: true,
        mutex: true,
        backdrop: true,
        playsInline: true,
        autoPlayback: false,
        airplay: true,
        theme: "#FFD875",
        lang: "vi",
        moreVideoAttr: {
          crossOrigin: "anonymous",
        },
        customType: {
          m3u8: function (video, url) {
            let hls: Hls | null = null;
            let retryCount = 0;
            const maxRetries = 3;

            let hasResumed = false;

            const createHls = () => {
              if (hls) {
                hls.destroy();
              }

              hls = new Hls({
                debug: false,
                enableWorker: true,
                lowLatencyMode: false,
                backBufferLength: 90,
                maxBufferLength: 30,
                maxMaxBufferLength: 600,
                maxBufferSize: 60 * 1000 * 1000,
                maxBufferHole: 0.5,
                highBufferWatchdogPeriod: 2,
                nudgeOffset: 0.2,
                nudgeMaxRetry: 5,
                maxFragLookUpTolerance: 0.25,
                liveSyncDurationCount: 3,
                liveMaxLatencyDurationCount: 10,
                enableSoftwareAES: true,
                manifestLoadingTimeOut: 15000,
                manifestLoadingMaxRetry: 4,
                manifestLoadingRetryDelay: 1000,
                levelLoadingTimeOut: 15000,
                levelLoadingMaxRetry: 4,
                levelLoadingRetryDelay: 1000,
                fragLoadingTimeOut: 30000,
                fragLoadingMaxRetry: 4,
                fragLoadingRetryDelay: 1000,
                startLevel: -1,
                startPosition: -1,
                abrEwmaDefaultEstimate: 500000,
                abrBandWidthFactor: 0.95,
                abrBandWidthUpFactor: 0.7,
                abrMaxWithRealBitrate: true,
                maxStarvationDelay: 4,
                maxLoadingDelay: 4,
                testBandwidth: true,
                progressive: false,
              });

              hls.loadSource(url);
              hls.attachMedia(video);

              hls.on(Hls.Events.MANIFEST_PARSED, function () {});

              return () => {
                if (hls) {
                  hls.destroy();
                  hls = null;
                }
              };
            };

            createHls();

            return () => {
              if (hls) {
                hls.destroy();
                hls = null;
              }
            };
          },
        },
      });

      artPlayerRef.current = art;

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      progressIntervalRef.current = setInterval(() => {
        if (artPlayerRef.current) {
          const current = artPlayerRef.current.currentTime;
          const duration = artPlayerRef.current.duration;
          if (duration > 0) {
            const percent = Math.round((current / duration) * 100);
            sendProgress(percent);
          }
        }
      }, 1000);

      art.on("ready", () => {
        if (resumeTimeRef.current !== null) {
          const t = resumeTimeRef.current;
          if (t > 0 && t < art.duration) {
            (art as any).seek?.(t);
          }
        }
      });

      art.on("play", () => {});

      art.on("pause", () => {});

      art.on("seek", (currentTime: number) => {
        try {
          const duration = art.duration;

          if (
            currentTime >= 0 &&
            duration > 0 &&
            isFinite(currentTime) &&
            isFinite(duration)
          ) {
            const progress = currentTime / duration;

            const percent = Math.round(progress * 100);
            sendProgress(percent);

            const videoElement = art.video;
            if (videoElement) {
              setTimeout(() => {
                if (videoElement.paused && videoElement.readyState >= 2) {
                  videoElement.play().catch(() => {});
                }
              }, 150);
            }
          }
        } catch {}
      });

      const videoElement = art.video;
      if (videoElement) {
        videoElement.addEventListener("ended", () => {
          sendProgress(100);
        });
      }

      art.on("error", (error) => {
        setUseFallback(true);
      });

      return () => {
        if (artPlayerRef.current) {
          artPlayerRef.current.destroy();
          artPlayerRef.current = null;
        }
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    } else {
      setVideoError("Trình duyệt không hỗ trợ HLS");
      setUseFallback(true);
    }
  }, [m3u8Url, title]);

  const getContainerStyle = () => ({
    position: "relative" as const,
    width: "100%",
    backgroundColor: "#000",
    overflow: "hidden" as const,
    height: "0",
    paddingBottom: "56.25%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const getVideoStyle = () => ({
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    objectFit: "contain" as const,
    backgroundColor: "#000",
  });

  console.log("embedUrlembedUrlembedUrl", embedUrl);
  
  return (
    <div className="watch-player">
      <div className="wp-bread line-center">
        <Link
          className="btn btn-circle btn-outline me-2"
          href={`/phim/${slug}`}
        >
          <i className="fa-solid fa-angle-left"></i>
        </Link>
        <h2 className="heading-sm page-name mb-0">Xem phim {title}</h2>
      </div>

      <div className="player-ratio">
        {servers && servers.length > 0 && (
          <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
            <span className="text-light small">Chọn server:</span>
            {servers.map((server, idx) => (
              <button
                key={idx}
                className={`btn btn-sm ${
                  idx === selectedServerIndex
                    ? "btn-primary"
                    : "btn-outline-light"
                }`}
                onClick={() => setSelectedServerIndex(idx)}
                disabled={server.status && server.status !== "success"}
                title={server.status || ""}
              >
                {server.serverName || `Server #${idx + 1}`}
              </button>
            ))}
          </div>
        )}
        <div className="video-container" style={getContainerStyle()}>
          {videoError ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#000",
              }}
            >
              <div className="text-center text-light">
                <i
                  className="fa-solid fa-exclamation-triangle mb-2"
                  style={{ fontSize: "2rem" }}
                ></i>
                <p className="mb-2">{videoError}</p>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => window.location.reload()}
                >
                  Thử lại
                </button>
              </div>
            </div>
          ) : m3u8Url && !useFallback ? (
            <div ref={playerRef} style={getVideoStyle()}></div>
          ) : (
            <iframe
              width="100%"
              height="100%"
              id="embed-player"
              allow="autoplay; encrypted-media; picture-in-picture;"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              src={embedUrl}
              style={getVideoStyle()}
            ></iframe>
          )}
        </div>
        <VideoBar slug={slug} title={title} />
      </div>

      {showResumeModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,0.6)", zIndex: 2000 }}
        >
          <div className="bg-dark text-light p-4 rounded">
            <p className="mb-3">Bạn có muốn xem tiếp không?</p>
            <div className="d-flex gap-3 justify-content-end">
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleDismissResume}
              >
                Xem từ đầu
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleResume}>
                Xem tiếp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
