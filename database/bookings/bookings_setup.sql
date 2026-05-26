-- ============================================================
-- G-One Media — Use Case: Bookings
-- Run database/core/schema.sql first if table doesn't exist yet
-- ============================================================

-- The bookings table is already defined in core/schema.sql.
-- This file contains helpful queries for managing bookings.

-- View all bookings (newest first)
select
  id,
  name,
  email,
  service,
  budget,
  details,
  status,
  created_at
from bookings
order by created_at desc;

-- Count bookings by status
select status, count(*) as total
from bookings
group by status;

-- Count bookings by service type
select service, count(*) as total
from bookings
group by service
order by total desc;

-- Mark a booking as confirmed (replace <uuid> with actual id)
-- update bookings set status = 'confirmed' where id = '<uuid>';

-- View today's bookings
select * from bookings
where created_at::date = current_date
order by created_at desc;

-- View bookings from last 7 days
select * from bookings
where created_at > now() - interval '7 days'
order by created_at desc;
