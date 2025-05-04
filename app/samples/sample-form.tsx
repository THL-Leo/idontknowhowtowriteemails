"use client";

import { useState } from "react";
import { toast } from "sonner";

export function SampleForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    
    if (!description.trim() || !content.trim()) {
      toast.error("Please fill out all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/samples", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description, content }),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        const errorMessage = responseData.error || "Failed to add sample";
        console.error("Error from server:", errorMessage);
        throw new Error(errorMessage);
      }
      
      toast.success("Sample added successfully");
      setDescription("");
      setContent("");
      
      // Wait a moment before reloading to allow the toast to show
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      let errorMessage = "An error occurred while adding your sample";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'toString' in error) {
        errorMessage = error.toString();
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div>
      <h2 style={{ 
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: 'var(--foreground)'
      }}>
        Add New Sample
      </h2>
      
      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label 
              htmlFor="description" 
              style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Description
            </label>
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., Thank you email to client"
              style={{ 
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--input)',
                backgroundColor: 'transparent',
                color: 'var(--foreground)'
              }}
            />
            <p style={{ 
              fontSize: '0.75rem', 
              color: 'var(--muted-foreground)', 
              marginTop: '0.5rem' 
            }}>
              A short name to help you remember this sample
            </p>
          </div>
          
          <div>
            <label 
              htmlFor="content" 
              style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Email Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste an example of an email you've written..."
              style={{ 
                width: '100%',
                minHeight: '150px',
                padding: '0.75rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--input)',
                backgroundColor: 'transparent',
                color: 'var(--foreground)',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
            <p style={{ 
              fontSize: '0.75rem', 
              color: 'var(--muted-foreground)', 
              marginTop: '0.5rem' 
            }}>
              Include the full email content, including greeting and signature
            </p>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={isLoading}
              className="button button-primary"
              style={{ 
                padding: '0.5rem 1.5rem',
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? 'Adding...' : 'Add Sample'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}