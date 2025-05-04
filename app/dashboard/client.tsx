'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

interface User {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
}

// This is a client component that works with the server-side data
export default function DashboardClientPage({ initialUser }: { initialUser: User }) {
  const [description, setDescription] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast.error('Please provide an email description');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate email');
      }
      
      setGeneratedEmail(data.email);
      toast.success('Email generated successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyToClipboard = () => {
    if (!generatedEmail) return;
    
    navigator.clipboard.writeText(generatedEmail)
      .then(() => toast.success('Copied to clipboard!'))
      .catch(() => toast.error('Failed to copy to clipboard'));
  };
  
  const handleRegenerate = () => {
    if (!description) return;
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };
  
  return (
    <div className="container" style={{ padding: '3rem 0', maxWidth: '1200px' }}>
      <h1 style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        marginBottom: '0.5rem',
        color: 'var(--foreground)'
      }}>
        Welcome, {initialUser?.name?.split(' ')[0] || 'User'}
      </h1>
      <p style={{ 
        marginBottom: '2.5rem',
        color: 'var(--muted-foreground)'
      }}>
        Generate emails that match your writing style
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 600px), 1fr))', 
        gap: '2rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}>
            <div style={{ 
              borderBottom: '1px solid var(--border)', 
              padding: '1rem 1.5rem',
              marginBottom: '1rem'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Generate New Email</h2>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ padding: '0 1.5rem', flex: 1 }}>
                <label htmlFor="description" style={{ 
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem'
                }}>
                  Email Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="I need to write a thank you email to a client who just signed a contract..."
                  style={{ 
                    width: '100%',
                    minHeight: '200px',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--input)',
                    backgroundColor: 'transparent',
                    color: 'var(--foreground)',
                    fontFamily: 'inherit',
                    resize: 'none',
                    marginBottom: '0.5rem'
                  }}
                />
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--muted-foreground)',
                  marginBottom: '1rem'
                }}>
                  Be specific about the recipient, purpose, tone, and key points.
                </p>
                
                <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                  <Link 
                    href="/samples/sample-form"
                    style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--primary)',
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    Need to add more sample emails?
                  </Link>
                </div>
              </div>
              
              <div style={{ 
                padding: '1.5rem', 
                borderTop: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <button 
                  type="submit"
                  className="button button-primary"
                  style={{ 
                    padding: '0.5rem 1.5rem',
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : 'Generate Email'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="card" style={{ 
            backgroundColor: 'var(--muted)',
            borderColor: 'var(--border)'
          }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '1rem' 
            }}>
              Quick Tips
            </h3>
            <ul style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
              <li style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '0.5rem',
                marginBottom: '0.75rem'
              }}>
                <span style={{ color: 'var(--primary)' }}>•</span>
                <span>Add 3-5 diverse email samples for the best results</span>
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '0.5rem',
                marginBottom: '0.75rem'
              }}>
                <span style={{ color: 'var(--primary)' }}>•</span>
                <span>Be specific about tone, context, and key points</span>
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '0.5rem'
              }}>
                <span style={{ color: 'var(--primary)' }}>•</span>
                <span>Edit the generated email to add personal touches</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="card" style={{ 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <div style={{ 
            borderBottom: '1px solid var(--border)', 
            padding: '1rem 1.5rem'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Generated Email</h2>
          </div>
          
          <div style={{ 
            flex: 1,
            padding: '1.5rem',
            display: 'flex',
            alignItems: generatedEmail ? 'flex-start' : 'center',
            justifyContent: generatedEmail ? 'flex-start' : 'center',
            color: generatedEmail ? 'var(--foreground)' : 'var(--muted-foreground)',
            fontSize: '0.875rem',
            minHeight: '300px',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.6',
            overflow: 'auto'
          }}>
            {generatedEmail ? (
              generatedEmail
            ) : (
              error ? (
                <p style={{ color: 'var(--destructive)' }}>{error}</p>
              ) : (
                <p>Your generated email will appear here</p>
              )
            )}
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem'
          }}>
            <button 
              className="button button-secondary"
              onClick={handleRegenerate}
              disabled={!generatedEmail || isLoading}
              style={{ 
                opacity: !generatedEmail || isLoading ? 0.5 : 1,
                cursor: !generatedEmail || isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              Regenerate
            </button>
            <button 
              className="button button-primary"
              onClick={handleCopyToClipboard}
              disabled={!generatedEmail || isLoading}
              style={{ 
                opacity: !generatedEmail || isLoading ? 0.5 : 1,
                cursor: !generatedEmail || isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}