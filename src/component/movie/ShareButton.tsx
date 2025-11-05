"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

interface ShareButtonProps {
  slug?: string;
  title?: string;
  variant?: 'default' | 'compact';
}

export default function ShareButton({ slug, title, variant = 'default' }: ShareButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShare = async (type: string) => {
    const url = `${window.location.origin}/phim/${slug}`;
    const shareText = `Xem phim ${title} tại Rophimmoi`;

    switch(type) {
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          toast.success("Đã sao chép link!", {
            position: "top-center",
            autoClose: 2000,
          });
        } catch (err) {
          toast.error("Không thể sao chép link!", {
            position: "top-center",
            autoClose: 2000,
          });
        }
        break;
      // case 'facebook':
      //   window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      //   break;
      // case 'twitter':
      //   window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, '_blank');
      //   break;
      // case 'telegram':
      //   window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`, '_blank');
      //   break;
    }
    setShowDropdown(false);
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.share-dropdown') && !target.closest('.item-share')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'compact') {
    return (
      <div className="item item-share">
        <div 
          className="inc-icon icon-12"
          onClick={() => setShowDropdown(!showDropdown)}
          style={{ cursor: 'pointer' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M16.3628 0.651489C15.946 0.223669 15.3291 0.0642849 14.7538 0.232058L1.34002 4.13277C0.733102 4.30139 0.302926 4.78541 0.187045 5.4003C0.0686637 6.02609 0.482166 6.82049 1.02239 7.15268L5.2166 9.73051C5.64678 9.99475 6.20201 9.92848 6.55799 9.56945L11.3608 4.73676C11.6026 4.4851 12.0027 4.4851 12.2445 4.73676C12.4862 4.98003 12.4862 5.37429 12.2445 5.62595L7.43334 10.4595C7.07653 10.8177 7.00984 11.3755 7.27245 11.8084L9.83516 16.0446C10.1353 16.548 10.6522 16.8332 11.2191 16.8332C11.2858 16.8332 11.3608 16.8332 11.4275 16.8248C12.0777 16.7409 12.5946 16.2963 12.7864 15.6671L16.763 2.2705C16.9381 1.70007 16.7797 1.07931 16.3628 0.651489Z" fill="currentColor"></path>
          </svg>
        </div>
        <span 
          onClick={() => setShowDropdown(!showDropdown)}
          style={{ cursor: 'pointer' }}
        >
          Chia sẻ
        </span>
        {showDropdown && (
          <div className="share-dropdown dropdown-menu show">
            <button className="dropdown-item" onClick={() => handleShare('copy')}>
              <i className="fa-solid fa-link me-2"></i>
              Sao chép link
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="item item-share position-relative">
      <Link 
        className="item-v" 
        href="#" 
        title="Chia sẻ" 
        onClick={(e) => { 
          e.preventDefault(); 
          setShowDropdown(!showDropdown);
        }}
      >
        <div className="inc-icon icon-16">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M16.3628 0.651489C15.946 0.223669 15.3291 0.0642849 14.7538 0.232058L1.34002 4.13277C0.733102 4.30139 0.302926 4.78541 0.187045 5.4003C0.0686637 6.02609 0.482166 6.82049 1.02239 7.15268L5.2166 9.73051C5.64678 9.99475 6.20201 9.92848 6.55799 9.56945L11.3608 4.73676C11.6026 4.4851 12.0027 4.4851 12.2445 4.73676C12.4862 4.98003 12.4862 5.37429 12.2445 5.62595L7.43334 10.4595C7.07653 10.8177 7.00984 11.3755 7.27245 11.8084L9.83516 16.0446C10.1353 16.548 10.6522 16.8332 11.2191 16.8332C11.2858 16.8332 11.3608 16.8332 11.4275 16.8248C12.0777 16.7409 12.5946 16.2963 12.7864 15.6671L16.763 2.2705C16.9381 1.70007 16.7797 1.07931 16.3628 0.651489Z" fill="currentColor"></path>
          </svg>
        </div>
        <span>Chia sẻ</span>
      </Link>
      {showDropdown && (
        <div className="share-dropdown dropdown-menu show">
          <button className="dropdown-item" onClick={() => handleShare('copy')}>
            <i className="fa-solid fa-link me-2"></i>
            Sao chép link
          </button>
          {/* <button className="dropdown-item" onClick={() => handleShare('facebook')}>
            <i className="fa-brands fa-facebook me-2"></i>
            Facebook
          </button>
          <button className="dropdown-item" onClick={() => handleShare('twitter')}>
            <i className="fa-brands fa-twitter me-2"></i>
            Twitter
          </button>
          <button className="dropdown-item" onClick={() => handleShare('telegram')}>
            <i className="fa-brands fa-telegram me-2"></i>
            Telegram
          </button> */}
        </div>
      )}
    </div>
  );
} 