/**
 * Created by sebas_000 on 27/11/2016.
 */
import io from 'socket.io-client'

export default function(){

	var client = io();

	client.on('company', function(company){
		console.log('Got company:', company);
	});

	client.on('product', function(product){
		console.log('Got product:', product);
	});

	client.on('company-tone', function(toneUpdate){
		console.log('Got tone-update:', toneUpdate)
	});
};