import mongoose from 'mongoose';
import { msg } from '../server';

const options = {
    versionKey: false,
    timestamps: {
        createdAt: true,
        updatedAt: 'modifiedAt',
    }
};

const paymentSchema = new mongoose.Schema(
    {
        purchaseId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Purchase',
            required: [true, msg.module.insertPurchaseId],
            index: true,
        },
        paymentMode: {
            type: String,
            enum: ['cash', 'cheque', 'online'],
            required: [true, msg.module.insertPaymentMode],
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'cancelled'],
            required: [true, msg.module.insertPaymentStatus],
        },
        dateOfPurchase: {
            type: Date,
            required: [true, msg.module.insertDispatchDate],
        },
        amount: {
            type: Number,
        }
    },
    options
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment; 