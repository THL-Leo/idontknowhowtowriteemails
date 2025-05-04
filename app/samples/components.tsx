'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface EmailSample {
  id: string;
  user_email: string;
  content: string;
  description?: string;
  created_at?: string;
}

export function SampleCard({ sample }: { sample: EmailSample }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  
  const handleDelete = async () => {
    if (isDeleting) return;
    
    if (!confirm('Are you sure you want to delete this sample?')) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/samples?id=${sample.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete sample');
      }
      
      toast.success('Sample deleted successfully');
      // Refresh the page to update the list
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete sample';
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <div className="card" style={{ 
      borderColor: 'var(--border)', 
      margin: 0,
      position: 'relative',
      transition: 'all 0.2s ease',
      borderWidth: '1px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '0.5rem'
      }}>
        <div style={{ paddingRight: '1.5rem' }}>
          <h4 style={{ 
            fontSize: '1rem', 
            fontWeight: '600', 
            marginBottom: '0.25rem',
            color: 'var(--foreground)'
          }}>
            {sample.description || 'Email Sample'}
          </h4>
          <p style={{ 
            fontSize: '0.75rem', 
            color: 'var(--muted-foreground)'
          }}>
            Added on {new Date(sample.created_at || '').toLocaleDateString()}
          </p>
        </div>
        
        <button 
          onClick={handleDelete}
          aria-label="Delete sample"
          disabled={isDeleting}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: isDeleting ? 'not-allowed' : 'pointer',
            opacity: isDeleting ? 0.5 : 1,
            color: 'var(--muted-foreground)',
            fontSize: '1.25rem',
            padding: '0.25rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '1.75rem',
            height: '1.75rem',
            flexShrink: 0,
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.color = 'var(--destructive)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--muted-foreground)';
          }}
        >
          ×
        </button>
      </div>
      
      <div style={{ 
        fontSize: '0.875rem', 
        color: 'var(--foreground)', 
        borderTop: '1px solid var(--border)',
        paddingTop: '0.75rem',
        whiteSpace: 'pre-wrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        lineHeight: '1.5'
      }}>
        {sample.content.substring(0, 180)}
        {sample.content.length > 180 ? '...' : ''}
      </div>
    </div>
  );
}