import React from 'react';
import { colors, borderRadius, shadows } from '../../styles/Community';

/* -------------------------- 🧭 Header -------------------------- */
export function Header() {
  const navItems = [
    { label: '홈', href: '/' },
    { label: '랜덤채팅', href: '/random' },
    { label: 'AI 채팅', href: '/ai' },
    { label: '커뮤니티', href: '/community', highlight: true },
    { label: '내 기록', href: '/history' },
  ];

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        background: colors.white,
        boxShadow: shadows.small,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: 700, color: colors.text.primary }}>
        🌿 사이사이
      </div>

      <nav style={{ display: 'flex', gap: '32px', fontSize: '15px' }}>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            style={{
              textDecoration: 'none',
              color: item.highlight ? colors.primary : colors.text.secondary,
              fontWeight: item.highlight ? 600 : 400,
              transition: 'color 0.3s',
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

/* ------------------------ 📄 PageHeader ------------------------ */
export function PageHeader({ title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      <h1
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: colors.text.primary,
          marginBottom: '12px',
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: '15px',
          color: colors.text.secondary,
          lineHeight: 1.6,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

/* --------------------------- 🏷 Tag --------------------------- */
export function Tag({ children, onRemove }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: colors.background,
        color: colors.text.primary,
        border: `1px solid ${colors.border.light}`,
        borderRadius: borderRadius.large,
        padding: '6px 12px',
        fontSize: '14px',
        fontWeight: 500,
        boxShadow: shadows.small,
      }}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            background: 'none',
            border: 'none',
            marginLeft: '8px',
            color: colors.text.tertiary,
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

/* ---------------------- ✍️ CharacterCount ---------------------- */
export function CharacterCount({ current, max }) {
  const percent = (current / max) * 100;
  const isNearLimit = percent >= 90;

  return (
    <div style={{ textAlign: 'right', marginTop: '6px' }}>
      <span
        style={{
          fontSize: '13px',
          color: isNearLimit ? colors.error : colors.text.tertiary,
        }}
      >
        {current} / {max}
      </span>
    </div>
  );
}

/* ---------------------- ◀️ BackButton ---------------------- */
export function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      style={{
        background: 'none',
        border: 'none',
        color: colors.text.secondary,
        fontSize: '15px',
        cursor: 'pointer',
        margin: '20px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      ← 돌아가기
    </button>
  );
}

/* ---------------------- 👤 UserAvatar ---------------------- */
export function UserAvatar({ name, size = 48 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: colors.primary,
        color: colors.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: size * 0.4,
        boxShadow: shadows.small,
      }}
    >
      {name.charAt(0)}
    </div>
  );
}

/* ---------------------- 🏷 CategoryBadge ---------------------- */
export function CategoryBadge({ category, icon }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: colors.background,
        color: colors.text.secondary,
        padding: '6px 12px',
        borderRadius: borderRadius.large,
        fontSize: '14px',
        fontWeight: 500,
      }}
    >
      <span>{icon}</span>
      <span>{category}</span>
    </div>
  );
}

/* ---------------------- ❤️ ActionButton ---------------------- */
export function ActionButton({ icon, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: active ? colors.primary : colors.text.secondary,
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <span>{icon}</span>
      <span style={{ fontSize: '14px' }}>{count}</span>
    </button>
  );
}

/* ---------------------- 🔗 ShareButton ---------------------- */
export function ShareButton({ icon, title, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: `1px solid ${colors.border.light}`,
        borderRadius: borderRadius.medium,
        padding: '8px 14px',
        fontSize: '14px',
        cursor: 'pointer',
        color: colors.text.secondary,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s',
      }}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </button>
  );
}

/* ---------------------- 💬 Comment ---------------------- */
export function Comment({ comment }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: '16px',
        borderRadius: borderRadius.medium,
        background: colors.white,
        boxShadow: shadows.small,
      }}
    >
      <UserAvatar name={comment.avatar} size={40} />
      <div style={{ marginLeft: '16px', flex: 1 }}>
        <div
          style={{
            fontWeight: 600,
            color: colors.text.primary,
            fontSize: '15px',
            marginBottom: '4px',
          }}
        >
          {comment.author}
        </div>
        <div
          style={{
            fontSize: '13px',
            color: colors.text.tertiary,
            marginBottom: '8px',
          }}
        >
          {comment.time}
        </div>
        <div style={{ fontSize: '15px', color: colors.text.secondary, lineHeight: 1.6 }}>
          {comment.text}
        </div>
        <div
          style={{
            marginTop: '8px',
            color: colors.text.tertiary,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          👍 {comment.likes}
        </div>
      </div>
    </div>
  );
}
