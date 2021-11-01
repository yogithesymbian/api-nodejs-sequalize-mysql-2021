var response = require("../utils/res");
const { payment } = require("../db/models");
const config = require("../config/auth.config");

exports.payment_notification_listen = async (req, res) => {
    const midtransClient = require('midtrans-client');

  // Create Core API / Snap instance (both have shared `transactions` methods)
    let apiClient = new midtransClient.Snap({
          isProduction : false,
          serverKey : config.server_key,
          clientKey : config.client_key
    });
    let notificationJson = req.body;
    console.log(notificationJson);

    apiClient.transaction.notification(notificationJson)
        .then((statusResponse) => {
            let orderId = statusResponse.order_id;
            let transactionStatus = statusResponse.transaction_status;
            let fraudStatus = statusResponse.fraud_status;

            console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

            // Sample transactionStatus handling logic

            if (transactionStatus == 'capture'){
                if (fraudStatus == 'challenge'){
                    // TODO set transaction status on your database to 'challenge'
                    // and response with 200 OK
                    return response.ok(res, "challange", 1);
                } else if (fraudStatus == 'accept'){
                    // TODO set transaction status on your database to 'success'
                    // and response with 200 OK
                    return response.ok(res, "accept", 1);
                }
            } else if (transactionStatus == 'settlement'){
                // TODO set transaction status on your database to 'success'
                // and response with 200 OK
                return response.ok(res, "settlement", 1);
            } else if (transactionStatus == 'cancel' ||
                transactionStatus == 'deny' ||
                transactionStatus == 'expire'){
                // TODO set transaction status on your database to 'failure'
                // and response with 200 OK
                return response.ok(res, "cancel | deny | expire", 1);
            } else if (transactionStatus == 'pending'){
                // TODO set transaction status on your database to 'pending' / waiting payment
                // and response with 200 OK
                return response.ok(res, "pending", 1);
            }
        }).catch((err) => {
            console.log('payment webhook error :', err);
            // return response.err(res, err, 404);
            // return 'error';
        });
};