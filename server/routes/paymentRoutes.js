const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Stripe payment intent (placeholder - requires Stripe secret key)
router.post('/stripe/create-intent', protect, async (req, res) => {
    try {
        // In production, you would use:
        // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        // const paymentIntent = await stripe.paymentIntents.create({...});

        const { amount, currency = 'usd' } = req.body;

        // Simulated response for demo
        res.json({
            success: true,
            clientSecret: 'pi_demo_secret_' + Date.now(),
            message: 'Stripe payment intent created (demo mode)',
            amount,
            currency
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// JazzCash payment initiation
router.post('/jazzcash/initiate', protect, async (req, res) => {
    try {
        const { amount, phone, orderId } = req.body;

        // JazzCash integration requires:
        // - Merchant ID
        // - Password
        // - Integrity Salt
        // - Return URL

        // In production, generate hash and redirect to JazzCash
        const transactionId = 'JC' + Date.now();

        res.json({
            success: true,
            transactionId,
            message: 'JazzCash payment initiated',
            redirectUrl: `https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/?pp_TxnRefNo=${transactionId}`,
            // These would be generated with proper hashing in production
            formFields: {
                pp_TxnRefNo: transactionId,
                pp_Amount: amount * 100, // JazzCash uses paisa
                pp_MobileNumber: phone,
                pp_Description: `EcoTrack Order #${orderId}`
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// EasyPaisa payment initiation
router.post('/easypaisa/initiate', protect, async (req, res) => {
    try {
        const { amount, phone, orderId } = req.body;

        // EasyPaisa integration requires:
        // - Store ID
        // - Store Name
        // - Transaction Amount
        // - Order Reference Number

        const transactionId = 'EP' + Date.now();

        res.json({
            success: true,
            transactionId,
            message: 'EasyPaisa payment initiated',
            // EasyPaisa MA (Mobile Account) flow
            paymentUrl: `https://easypaisa.com.pk/checkout?amount=${amount}&orderId=${transactionId}`,
            formFields: {
                storeId: process.env.EASYPAISA_STORE_ID || 'demo_store',
                amount: amount,
                postBackURL: `${process.env.BASE_URL || 'http://localhost:5000'}/api/payment/easypaisa/callback`,
                orderRefNum: transactionId,
                mobileNum: phone
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Payment verification callbacks
router.post('/jazzcash/callback', async (req, res) => {
    try {
        const { pp_ResponseCode, pp_TxnRefNo, pp_Amount } = req.body;

        // Verify the hash signature in production
        if (pp_ResponseCode === '000') {
            // Update order status
            res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/success?txn=${pp_TxnRefNo}`);
        } else {
            res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/failed`);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/easypaisa/callback', async (req, res) => {
    try {
        const { status, orderRefNumber } = req.body;

        if (status === '0000') {
            res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/success?txn=${orderRefNumber}`);
        } else {
            res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/failed`);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
