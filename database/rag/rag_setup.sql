-- =============================================================================
-- G-One Media — Use Case: RAG / Vector Database & Similarity Search Setup
-- Enable the pgvector extension and configure documents table for AI agent
-- =============================================================================

-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Drop existing resources so we can recreate them with 3072 dimensions if needed
drop function if exists match_documents;
drop table if exists documents;

-- Create a table to store knowledge base documents and their embeddings
create table documents (
  id bigint primary key generated always as identity,
  content text not null,
  metadata jsonb,
  embedding vector(3072) -- Gemini embedding-004 / text-embedding-004 uses 3072 dimensions
);

-- Enable RLS and create policies for public access (since this is public knowledge)
alter table documents enable row level security;

create policy "Allow public read access"
  on documents for select
  using (true);

create policy "Allow public insert access"
  on documents for insert
  with check (true);

-- Create a function to search for documents
create or replace function match_documents (
  query_embedding vector(3072),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
