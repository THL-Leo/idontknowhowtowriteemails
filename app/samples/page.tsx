import { requireAuth } from "@/lib/auth";
import { getUserSamples } from "@/lib/db";
import { SampleForm } from "./sample-form";
import { SampleCard } from "./components";

interface EmailSample {
  id: string;
  user_email: string;
  content: string;
  description?: string;
  created_at?: string;
}

export default async function SamplesPage() {
  const user = await requireAuth();
  const samples = await getUserSamples(user.email || "");
  
  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1 style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        marginBottom: '0.5rem',
        color: 'var(--foreground)'
      }}>
        Email Samples
      </h1>
      <p style={{ 
        marginBottom: '2.5rem',
        color: 'var(--muted-foreground)'
      }}>
        Add examples of your emails to teach Claude your writing style
      </p>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem' 
      }}>
        <div style={{ flex: '1' }}>
          <SampleForm />
        </div>
        
        <div style={{ flex: '1' }}>
          <h2 style={{ 
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: 'var(--foreground)'
          }}>
            Your Samples {samples.length > 0 ? `(${samples.length})` : ''}
          </h2>
          
          {samples.length === 0 ? (
            <div className="card" style={{ 
              backgroundColor: 'var(--muted)',
              padding: '1.5rem',
              textAlign: 'center',
              color: 'var(--muted-foreground)'
            }}>
              <p>You haven&apos;t added any samples yet.</p>
              <p>Add your first sample to get started.</p>
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem',
              maxHeight: '600px', 
              overflowY: 'auto', 
              paddingRight: '0.5rem' 
            }}>
              {samples.map((sample: EmailSample) => (
                <SampleCard key={sample.id} sample={sample} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}