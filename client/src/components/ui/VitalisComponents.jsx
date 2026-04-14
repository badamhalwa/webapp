/**
 * VitalisComponents.jsx
 * New UI primitives derived from the Stitch "Vitalis Medical" design system
 * Project ID: 7479445649926354283
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

/* ─── PatientCard ────────────────────────────────────────────────────────────
 * Vitalis-style card with left teal accent bar — used for patient records,
 * appointment entries, complaint tickets, and any "record" type item.
 */
export const PatientCard = ({ children, accent = 'teal', className = '', hover = true, ...props }) => {
  const accentColors = {
    teal: 'var(--vs-secondary)',
    gold: 'var(--vs-gold)',
    red:  'var(--vs-error)',
    navy: 'var(--vs-primary-container)',
    gray: 'var(--vs-outline-variant)',
  };
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      className={`rounded-xl relative overflow-hidden ${className}`}
      style={{
        background: 'var(--vs-surface-container-lowest)',
        boxShadow: 'var(--vs-shadow-ambient)',
        borderLeft: `4px solid ${accentColors[accent] || accentColors.teal}`,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/* ─── VitalisCard ────────────────────────────────────────────────────────────
 * Standard elevated card — white surface on gray background, no border.
 */
export const VitalisCard = ({ children, className = '', hover = true, ...props }) => (
  <motion.div
    whileHover={hover ? { y: -3, boxShadow: 'var(--vs-shadow-floating)' } : {}}
    className={`rounded-xl transition-all ${className}`}
    style={{
      background: 'var(--vs-surface-container-lowest)',
      boxShadow: 'var(--vs-shadow-ambient)',
    }}
    {...props}
  >
    {children}
  </motion.div>
);

/* ─── StatDisplay ────────────────────────────────────────────────────────────
 * Vitalis editorial stat layout: large number + small label side by side.
 * From the "Diagnostic Dashboard" asymmetric magazine layout.
 */
export const StatDisplay = ({ value, label, icon, suffix = '', accent = false }) => (
  <div
    className="rounded-xl p-6"
    style={{
      background: accent ? 'var(--vs-primary-container)' : 'var(--vs-surface-container-lowest)',
      boxShadow: 'var(--vs-shadow-ambient)',
    }}
  >
    {icon && <div className="text-3xl mb-3">{icon}</div>}
    <div
      className="text-4xl font-black leading-none mb-1"
      style={{ fontFamily: 'Manrope, sans-serif', color: accent ? 'white' : 'var(--vs-on-surface)' }}
    >
      {value}{suffix}
    </div>
    <div
      className="text-sm font-medium uppercase tracking-wide"
      style={{ color: accent ? 'rgba(255,255,255,0.65)' : 'var(--vs-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}
    >
      {label}
    </div>
  </div>
);

/* ─── VitalisHero ────────────────────────────────────────────────────────────
 * Gradient hero section matching the Vitalis/RRDCH design.
 * Children are rendered inside the max-width container.
 */
export const VitalisHero = ({ title, subtitle, breadcrumb, children, gradient = 'from-[#001228] via-[#001e40] to-[#003366]' }) => (
  <section className={`bg-gradient-to-br ${gradient} text-white`}>
    <div className="max-w-7xl mx-auto px-8 md:px-14 py-16 md:py-20">
      {breadcrumb && (
        <nav className="breadcrumb mb-4" aria-label="Breadcrumb">
          {breadcrumb.split(' / ').map((crumb, i, arr) => (
            <React.Fragment key={i}>
              {i < arr.length - 1
                ? <><a href={i === 0 ? '/' : '#'}>{crumb}</a><span className="sep">/</span></>
                : <span style={{ color: 'rgba(255,255,255,0.55)' }}>{crumb}</span>
              }
            </React.Fragment>
          ))}
        </nav>
      )}
      <h1
        className="text-4xl md:text-5xl font-black mb-4 leading-tight"
        style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.03em' }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
           style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif' }}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  </section>
);

/* ─── VitalisSection ─────────────────────────────────────────────────────────
 * Standard page section with generous spacing.
 */
export const VitalisSection = ({ children, surface = 'white', className = '' }) => {
  const bgs = {
    white:  'var(--vs-surface-container-lowest)',
    gray:   'var(--vs-surface)',
    low:    'var(--vs-surface-container-low)',
    navy:   'var(--vs-primary)',
  };
  return (
    <section
      className={`py-24 px-8 md:px-14 ${className}`}
      style={{ background: bgs[surface] || bgs.white }}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

/* ─── SectionHeader ──────────────────────────────────────────────────────────
 * Vitalis section header — Manrope heading + teal underline.
 */
export const VitalisSectionHeader = ({ title, subtitle, center = false, action, actionPath }) => (
  <div className={`mb-12 ${center ? 'text-center' : 'flex justify-between items-end flex-wrap gap-4'}`}>
    <div>
      <h2
        className="text-3xl md:text-4xl font-black mb-3 leading-tight"
        style={{ fontFamily: 'Manrope, sans-serif', color: 'var(--vs-on-surface)', letterSpacing: '-0.02em' }}
      >
        {title}
      </h2>
      <div
        className={`h-1 w-16 rounded-full ${center ? 'mx-auto' : ''}`}
        style={{ background: 'var(--vs-secondary)' }}
      />
      {subtitle && (
        <p className="mt-4 text-base max-w-xl" style={{ color: 'var(--vs-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}>
          {subtitle}
        </p>
      )}
    </div>
    {action && actionPath && !center && (
      <Link to={actionPath}
        className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
        style={{ color: 'var(--vs-secondary)', fontFamily: 'Manrope, sans-serif' }}
      >
        {action} <FiArrowRight size={14} />
      </Link>
    )}
  </div>
);

/* ─── VitalisChip ────────────────────────────────────────────────────────────
 * Pill chip — Vitalis style (no border, background-filled).
 */
export const VitalisChip = ({ label, variant = 'teal' }) => (
  <span className={`vs-chip vs-chip-${variant}`}>{label}</span>
);

/* ─── GlassModal ─────────────────────────────────────────────────────────────
 * Glassmorphic floating modal overlay.
 */
export const GlassModal = ({ children, onClose, title }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
       style={{ background: 'rgba(0,30,64,0.6)', backdropFilter: 'blur(8px)' }}>
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="w-full max-w-lg rounded-2xl overflow-hidden"
      style={{ background: 'var(--vs-surface-container-lowest)', boxShadow: '0px 32px 64px -16px rgba(0,30,64,0.25)' }}
    >
      {title && (
        <div className="flex justify-between items-center px-6 py-4"
             style={{ borderBottom: '1px solid var(--vs-surface-container)' }}>
          <h3 className="font-bold text-lg" style={{ fontFamily: 'Manrope, sans-serif', color: 'var(--vs-on-surface)' }}>
            {title}
          </h3>
          {onClose && (
            <button onClick={onClose} className="p-1.5 rounded-lg transition-colors"
              style={{ color: 'var(--vs-on-surface-variant)' }}>✕</button>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </motion.div>
  </div>
);

/* ─── SectionDivider ─────────────────────────────────────────────────────────
 * Pure spacing — No visible HR line (Vitalis No-Line Rule).
 */
export const SectionDivider = ({ size = 'md' }) => {
  const heights = { sm: 'py-8', md: 'py-12', lg: 'py-16' };
  return <div className={heights[size]} aria-hidden="true" />;
};
