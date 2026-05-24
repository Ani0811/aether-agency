# G-One Media — Database Query Explorer

This folder contains all SQL files for the G-One Media Supabase database.
Paste any `.sql` file directly into the **Supabase SQL Editor** to run it.

## Files

| File | Purpose |
|------|---------|
| `00_schema.sql` | Create all tables (run first on a fresh project) |
| `01_seed_portfolio.sql` | Insert portfolio project cards |
| `02_seed_case_studies.sql` | Insert detailed case study data |
| `03_bookings.sql` | Create the `bookings` table for Schedule a Call |
| `04_payments.sql` | Create the `payments` table for Razorpay logs |
| `99_explore.sql` | Handy SELECT queries to inspect data |

## Quick Start

1. Go to [Supabase SQL Editor](https://supabase.com/dashboard/project/thsqjwkbqaewdyymeybd/sql)
2. Paste and run `00_schema.sql` first
3. Then `01_seed_portfolio.sql` and `02_seed_case_studies.sql`
4. Then `03_bookings.sql` and `04_payments.sql`

## Connection Details

- **Project URL**: `https://thsqjwkbqaewdyymeybd.supabase.co`
- **Dashboard**: https://supabase.com/dashboard/project/thsqjwkbqaewdyymeybd
