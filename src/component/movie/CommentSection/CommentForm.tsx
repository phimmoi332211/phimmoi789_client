import React from "react";
import ToggleSwitch from "../ToggleSwitch";

export default function CommentForm({
  value,
  onChange,
  onSubmit,
  loading,
  placeholder,
  disabled,
  isSpoiler,
  setIsSpoiler
}: any) {
  return (
    <div className="textarea-wrap">
      <div className="ma-input">
        <textarea 
          className="form-control v-form-control v-form-textarea" 
          rows={4} 
          cols={3} 
          maxLength={1000} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={disabled}
        />
        <div className="chac-left">{value.length} / 1000</div>
      </div>
      <div className="line-center d-flex gap-3 ma-buttons">
        {/* <div className="v-toggle v-toggle-min line-center">
          <ToggleSwitch 
            id="spoil-toggle"
            defaultState={isSpoiler}
            onChange={setIsSpoiler}
          />
          <div className="text">Tiết lộ?</div>
        </div> */}
        <div className="flex-grow-1"></div>
        <button 
          className="btn btn-basic btn-submit" 
          type="button"
          onClick={onSubmit}
          disabled={disabled || !value.trim() || loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Đang gửi...
            </>
          ) : (
            <>
              <span>Gửi</span>
              <div className="inc-icon icon-20 ms-1">
                <svg fill="none" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg">
                  <path d="m22.1012 10.5616-19.34831-9.43824c-.1664-.08117-.34912-.12336-.53427-.12336-.67302 0-1.21862.5456-1.21862 1.21862v.03517c0 .16352.02005.32643.05971.48507l1.85597 7.42384c.05069.2028.22214.3526.42986.3757l8.15756.9064c.2829.0314.4969.2705.4969.5552s-.214.5238-.4969.5552l-8.15756.9064c-.20772.0231-.37917.1729-.42986.3757l-1.85597 7.4238c-.03966.1587-.05971.3216-.05971.4851v.0352c0 .673.5456 1.2186 1.21862 1.2186.18515 0 .36787-.0422.53427-.1234l19.34831-9.4382c.5499-.2682.8988-.8265.8988-1.4384s-.3489-1.1702-.8988-1.4384z" fill="currentColor"></path>
                </svg>
              </div>
            </>
          )}
        </button>
      </div>
    </div>
  );
} 