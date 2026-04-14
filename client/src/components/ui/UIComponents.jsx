/**
 * UIComponents.jsx — Manipal-style Light Medical Theme
 * Uses vs-* CSS classes from index.css
 */
import React from 'react';
import { motion } from 'framer-motion';

/* ─── LoadingSpinner ─────────────────────────────────────────────────────── */
export const LoadingSpinner = ({ size = 40, message = 'Loading...' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, gap: 16 }}>
    <div
      style={{
        width: size, height: size,
        borderRadius: '50%',
        border: '3px solid #eaecf0',
        borderTop: '3px solid #003580',
        animation: 'spin 0.8s linear infinite',
      }}
      aria-label="Loading"
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    {message && <p style={{ fontSize: 12, color: '#777', fontFamily: 'Inter, sans-serif' }}>{message}</p>}
  </div>
);

/* ─── Button ─────────────────────────────────────────────────────────────── */
export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const variantClass = {
    primary: 'vs-btn vs-btn-primary',
    red:     'vs-btn vs-btn-red',
    teal:    'vs-btn vs-btn-teal',
    outline: 'vs-btn vs-btn-outline-navy',
    ghost:   'vs-btn vs-btn-ghost',
    danger:  'vs-btn vs-btn-red',
    gold:    'vs-btn vs-btn-red', // mapped to red in new theme
  };
  const sizeStyles = {
    sm: { padding: '6px 14px', fontSize: 11 },
    md: { padding: '9px 20px', fontSize: 13 },
    lg: { padding: '12px 28px', fontSize: 14 },
  };
  return (
    <button
      className={`${variantClass[variant] || variantClass.primary} ${className}`}
      style={{ ...sizeStyles[size], borderRadius: 4 }}
      {...props}
    >
      {children}
    </button>
  );
};

/* ─── Card ───────────────────────────────────────────────────────────────── */
export const Card = ({ children, hover = false, className = '', style = {}, ...props }) => (
  <motion.div
    whileHover={hover ? { y: -2 } : {}}
    className={`vs-card ${className}`}
    style={{ ...style }}
    {...props}
  >
    {children}
  </motion.div>
);

/* ─── Badge ──────────────────────────────────────────────────────────────── */
export const Badge = ({ children, variant = 'teal', className = '', ...props }) => {
  const variantMap = {
    teal:    'vs-badge vs-badge-teal',
    navy:    'vs-badge vs-badge-blue',
    blue:    'vs-badge vs-badge-blue',
    gold:    'vs-badge vs-badge-amber',
    caution: 'vs-badge vs-badge-amber',
    error:   'vs-badge vs-badge-red',
    red:     'vs-badge vs-badge-red',
    purple:  'vs-badge vs-badge-purple',
    green:   'vs-badge vs-badge-green',
    default: 'vs-badge vs-badge-gray',
  };
  return (
    <span className={`${variantMap[variant] || variantMap.default} ${className}`} {...props}>
      {children}
    </span>
  );
};

/* ─── StatusBadge ────────────────────────────────────────────────────────── */
export const StatusBadge = ({ status }) => {
  const map = {
    booked:         { cls: 'vs-badge vs-badge-blue',   label: 'Booked' },
    confirmed:      { cls: 'vs-badge vs-badge-teal',   label: 'Confirmed' },
    completed:      { cls: 'vs-badge vs-badge-purple', label: 'Completed' },
    pending:        { cls: 'vs-badge vs-badge-amber',  label: 'Pending' },
    resolved:       { cls: 'vs-badge vs-badge-teal',   label: 'Resolved' },
    available:      { cls: 'vs-badge vs-badge-green',  label: 'Available' },
    busy:           { cls: 'vs-badge vs-badge-amber',  label: 'Busy' },
    break:          { cls: 'vs-badge vs-badge-gray',   label: 'Break' },
    waiting:        { cls: 'vs-badge vs-badge-amber',  label: 'Waiting' },
    'in-progress':  { cls: 'vs-badge vs-badge-teal',   label: 'In Progress' },
    'on-duty':      { cls: 'vs-badge vs-badge-green',  label: 'On Duty' },
    'off-duty':     { cls: 'vs-badge vs-badge-gray',   label: 'Off Duty' },
  };
  const s = map[status] || map.pending;
  return <span className={s.cls}>{s.label}</span>;
};

/* ─── Form Inputs ────────────────────────────────────────────────────────── */
export const FormInput = ({ label, error, required, id, ...props }) => (
  <div className="vs-field">
    {label && (
      <label htmlFor={id} className="vs-label">
        {label}{required && <span style={{ color: '#e8282b' }}> *</span>}
      </label>
    )}
    <input
      id={id}
      className="vs-input"
      style={error ? { borderColor: '#e8282b', boxShadow: '0 0 0 2px rgba(232,40,43,0.1)' } : {}}
      aria-required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
    {error && <p id={`${id}-error`} style={{ fontSize: 11, color: '#e8282b', marginTop: 3, fontFamily: 'Inter, sans-serif' }}>{error}</p>}
  </div>
);

export const FormTextarea = ({ label, error, required, id, ...props }) => (
  <div className="vs-field">
    {label && (
      <label htmlFor={id} className="vs-label">
        {label}{required && <span style={{ color: '#e8282b' }}> *</span>}
      </label>
    )}
    <textarea
      id={id}
      className="vs-input"
      rows={4}
      style={{ resize: 'vertical', ...(error ? { borderColor: '#e8282b' } : {}) }}
      aria-required={required}
      aria-invalid={!!error}
      {...props}
    />
    {error && <p style={{ fontSize: 11, color: '#e8282b', marginTop: 3, fontFamily: 'Inter, sans-serif' }}>{error}</p>}
  </div>
);

export const FormSelect = ({ label, error, required, id, children, ...props }) => (
  <div className="vs-field">
    {label && (
      <label htmlFor={id} className="vs-label">
        {label}{required && <span style={{ color: '#e8282b' }}> *</span>}
      </label>
    )}
    <select
      id={id}
      className="vs-input"
      style={error ? { borderColor: '#e8282b' } : {}}
      aria-required={required}
      {...props}
    >
      {children}
    </select>
    {error && <p style={{ fontSize: 11, color: '#e8282b', marginTop: 3 }}>{error}</p>}
  </div>
);

/* ─── PageHero ───────────────────────────────────────────────────────────── */
export const PageHero = ({ title, subtitle, breadcrumb }) => (
  <section style={{ background: '#003580', padding: '2.5rem 2rem' }}>
    <div className="max-w-7xl mx-auto">
      {breadcrumb && (
        <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
          {breadcrumb.split(' / ').map((crumb, i, arr) => (
            <React.Fragment key={i}>
              {i < arr.length - 1
                ? <><a href={i === 0 ? '/' : '#'}>{crumb}</a><span className="sep">/</span></>
                : <span style={{ color: 'rgba(255,255,255,0.5)' }}>{crumb}</span>
              }
            </React.Fragment>
          ))}
        </nav>
      )}
      <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#ffffff', fontSize: '1.75rem', letterSpacing: '-0.02em', marginBottom: 8 }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.65 }}>
          {subtitle}
        </p>
      )}
    </div>
  </section>
);

/* ─── SectionHeader ──────────────────────────────────────────────────────── */
export const SectionHeader = ({ title, subtitle, centered }) => (
  <div style={{ marginBottom: 20, textAlign: centered ? 'center' : 'left' }}>
    <div className="vs-section-title" style={{ marginBottom: 4 }}>{title}</div>
    {subtitle && <div className="vs-section-sub">{subtitle}</div>}
  </div>
);

/* ─── StatCard ───────────────────────────────────────────────────────────── */
export const StatCard = ({ value, label, icon, color = 'navy' }) => {
  const colorMap = {
    navy:   { bg: '#003580', text: '#fff', sub: 'rgba(255,255,255,0.65)' },
    teal:   { bg: '#009688', text: '#fff', sub: 'rgba(255,255,255,0.7)' },
    red:    { bg: '#e8282b', text: '#fff', sub: 'rgba(255,255,255,0.7)' },
    white:  { bg: '#fff',    text: '#003580', sub: '#555e6b' },
    blue:   { bg: '#003580', text: '#fff', sub: 'rgba(255,255,255,0.65)' },
    gold:   { bg: '#f59e0b', text: '#fff', sub: 'rgba(255,255,255,0.7)' },
    purple: { bg: '#7c3aed', text: '#fff', sub: 'rgba(255,255,255,0.7)' },
  };
  const c = colorMap[color] || colorMap.navy;
  return (
    <motion.div whileHover={{ scale: 1.02, y: -2 }}
      style={{ background: c.bg, borderRadius: 10, padding: '1.25rem', boxShadow: '0 4px 16px rgba(0,53,128,0.1)' }}
    >
      {icon && <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>}
      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'Manrope, sans-serif', color: c.text }}>{value}</div>
      <div style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', color: c.sub, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    </motion.div>
  );
};

/* ─── SkeletonLoader ─────────────────────────────────────────────────────── */
export const SkeletonLoader = ({ lines = 3 }) => (
  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
    {Array(lines).fill(0).map((_, i) => (
      <div key={i} className="skeleton" style={{ height: 14, width: `${55 + Math.random() * 40}%` }} />
    ))}
  </div>
);

/* ─── EmptyState ─────────────────────────────────────────────────────────── */
export const EmptyState = ({ icon = '📭', title = 'Nothing here yet', message = '' }) => (
  <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
    <div style={{ fontSize: 52, marginBottom: 14 }}>{icon}</div>
    <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#1a1a2e', fontSize: 18, marginBottom: 6 }}>{title}</h3>
    {message && <p style={{ fontSize: 13, color: '#777', fontFamily: 'Inter, sans-serif' }}>{message}</p>}
  </div>
);
