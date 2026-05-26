-- ============================================================
-- G-One Media — Use Case: Payments
-- Run database/core/schema.sql first if table doesn't exist yet
-- ============================================================

-- The payments table is already defined in core/schema.sql.
-- This file contains helpful queries for managing payment records.

-- View all payments (newest first)
select
  id,
  razorpay_order_id,
  razorpay_payment_id,
  amount,
  currency,
  email,
  status,
  refund_id,
  refunded_at,
  created_at
from payments
order by created_at desc;

-- Total revenue captured (INR)
select
  sum(amount) as total_revenue,
  count(*) as total_payments
from payments
where status = 'captured';

-- Total refunded amount
select
  sum(amount) as total_refunded,
  count(*) as total_refunds
from payments
where status = 'refunded';

-- Revenue breakdown by month
select
  to_char(created_at, 'YYYY-MM') as month,
  sum(amount) as revenue,
  count(*) as payments
from payments
where status = 'captured'
group by month
order by month desc;

-- Look up a specific payment by Razorpay payment ID
-- select * from payments where razorpay_payment_id = 'pay_xxxxx';

-- Mark a payment as refunded (done automatically by server, but useful for manual correction)
-- update payments
-- set status = 'refunded', refund_id = '<refund_id>', refunded_at = now()
-- where razorpay_payment_id = 'pay_xxxxx';
