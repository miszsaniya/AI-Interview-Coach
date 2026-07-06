import { useState, useRef } from "react";
import "./ResumeUpload.css";

const ALLOWED_TYPES  = ["application/pdf", "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const MAX_SIZE_MB     = 5;

function fmtSize(bytes) {
  if (bytes < 1024)        return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function ResumeUploadPage() {
  const inputRef = useRef(null);

  const [file,      setFile]      = useState(null);
  const [dragging,  setDragging]  = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded,  setUploaded]  = useState(false);
  const [error,     setError]     = useState("");

  const validateAndSet = (f) => {
    setError("");
    if (!f) return;
    if (!ALLOWED_TYPES.includes(f.type) && !f.name.match(/\.(pdf|doc|docx)$/i)) {
      setError("Only PDF, DOC, and DOCX files are supported.");
      return;
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File must be under ${MAX_SIZE_MB} MB.`);
      return;
    }
    setFile(f);
    setUploaded(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    validateAndSet(dropped);
  };

  const handleFileChange = (e) => {
    validateAndSet(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 1500);
  };

  const handleRemove = () => {
    setFile(null);
    setUploaded(false);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="ru-page">
      {/* Page header */}
      <div className="ru-header">
        <h1 className="ru-header__title">Upload Resume</h1>
        <p className="ru-header__sub">
          Upload your resume to get personalised interview questions tailored to your experience.
        </p>
      </div>

      {/* Main card */}
      <div className="ru-card">
        {/* Success state */}
        {uploaded ? (
          <div className="ru-success">
            <div className="ru-success__icon">✅</div>
            <h2 className="ru-success__title">Resume Uploaded Successfully!</h2>
            <p className="ru-success__sub">
              <strong>{file.name}</strong> has been uploaded. Your interview questions will now be personalised based on your experience.
            </p>
            <div className="ru-success__info">
              <div className="ru-success__info-item">
                <span className="ru-success__info-icon">📄</span>
                <span>{file.name}</span>
              </div>
              <div className="ru-success__info-item">
                <span className="ru-success__info-icon">💾</span>
                <span>{fmtSize(file.size)}</span>
              </div>
            </div>
            <button className="ru-btn ru-btn--outline" onClick={handleRemove}>
              Upload a Different Resume
            </button>
          </div>
        ) : (
          <>
            {/* Drop zone */}
            <div
              className={`ru-dropzone ${dragging ? "ru-dropzone--active" : ""} ${file ? "ru-dropzone--has-file" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => !file && inputRef.current?.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="ru-dropzone__input"
                onChange={handleFileChange}
              />

              {file ? (
                <div className="ru-file-preview">
                  <div className="ru-file-preview__icon">📄</div>
                  <div className="ru-file-preview__info">
                    <div className="ru-file-preview__name">{file.name}</div>
                    <div className="ru-file-preview__size">{fmtSize(file.size)}</div>
                  </div>
                  <button
                    className="ru-file-preview__remove"
                    onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                    title="Remove file"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="ru-dropzone__content">
                  <div className="ru-dropzone__icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <div className="ru-dropzone__title">
                    {dragging ? "Drop your resume here" : "Drag & Drop your resume here"}
                  </div>
                  <div className="ru-dropzone__sub">or click to browse</div>
                  <div className="ru-dropzone__formats">Supports PDF, DOC, DOCX · Max {MAX_SIZE_MB}MB</div>
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="ru-error">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Buttons */}
            <div className="ru-actions">
              <button
                className="ru-btn ru-btn--secondary"
                onClick={() => inputRef.current?.click()}
              >
                Choose File
              </button>
              <button
                className="ru-btn ru-btn--primary"
                disabled={!file || uploading}
                onClick={handleUpload}
              >
                {uploading ? (
                  <>
                    <span className="ru-spinner" /> Uploading…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    Upload Resume
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Tips card */}
      <div className="ru-tips">
        <h2 className="ru-tips__title">📋 Tips for Best Results</h2>
        <div className="ru-tips__list">
          <div className="ru-tip">
            <div className="ru-tip__icon">✓</div>
            <div>
              <div className="ru-tip__title">Use a clean, text-based PDF</div>
              <div className="ru-tip__sub">Avoid scanned images or heavily designed templates for best parsing results.</div>
            </div>
          </div>
          <div className="ru-tip">
            <div className="ru-tip__icon">✓</div>
            <div>
              <div className="ru-tip__title">Include your skills section</div>
              <div className="ru-tip__sub">A clearly labeled skills section helps generate more targeted interview questions.</div>
            </div>
          </div>
          <div className="ru-tip">
            <div className="ru-tip__icon">✓</div>
            <div>
              <div className="ru-tip__title">List your projects and experience</div>
              <div className="ru-tip__sub">Detailed project descriptions and work experience lead to more relevant technical questions.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
