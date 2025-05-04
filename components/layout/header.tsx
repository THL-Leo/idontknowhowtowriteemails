"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <header style={{ 
      borderBottom: '1px solid var(--border)',
      padding: '1rem 0',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link href="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'var(--foreground)',
        }}>
          EmailWriter
        </Link>
        
        {session ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.5rem' 
          }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link
                href="/dashboard"
                style={{
                  fontSize: '0.875rem',
                  color: isActive("/dashboard") 
                    ? 'var(--foreground)' 
                    : 'var(--muted-foreground)',
                  fontWeight: isActive("/dashboard") ? 'medium' : 'normal',
                }}
              >
                Dashboard
              </Link>
              <Link
                href="/samples"
                style={{
                  fontSize: '0.875rem',
                  color: isActive("/samples") 
                    ? 'var(--foreground)' 
                    : 'var(--muted-foreground)',
                  fontWeight: isActive("/samples") ? 'medium' : 'normal',
                }}
              >
                My Samples
              </Link>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem' 
            }}>
              <span style={{ 
                fontSize: '0.875rem', 
                color: 'var(--muted-foreground)' 
              }}>
                {session.user?.name || session.user?.email}
              </span>
              
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="button"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border)',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.75rem',
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link
              href="#features"
              style={{
                fontSize: '0.875rem',
                color: 'var(--muted-foreground)',
              }}
            >
              Features
            </Link>
            
            <Link
              href="#how-it-works"
              style={{
                fontSize: '0.875rem',
                color: 'var(--muted-foreground)',
              }}
            >
              How It Works
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}