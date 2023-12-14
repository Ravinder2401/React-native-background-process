import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import BackgroundService from 'react-native-background-actions';
import axios from 'axios';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const MyNewServiceTwo = () => {
    const [btcPrice, setBtcPrice] = useState(0);

    useEffect(() => {
        // Fetch initial BTC price when the component mounts
        fetchBtcPrice();

        // Fetch BTC price every 5 seconds
        const intervalId = setInterval(fetchBtcPrice, 50000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const fetchBtcPrice = async () => {
        try {
            const response = await fetch('http://192.168.1.137:3000/currency');
    
            const data = await response.json();
            console.log('response ---', data[0].price);
    
            // Extract the BTC price from the response and update the state
            const price = data[0].price;
            setBtcPrice(price || 41000);
        } catch (error) {
            console.error('Error fetching BTC price:', error.message);
        }
    };

    const veryIntensiveTask = async (taskDataArguments) => {
        const { delay } = taskDataArguments;
        await new Promise(async (resolve) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                // Fetch and update BTC price in the background
                await fetchBtcPrice();
                await BackgroundService.updateNotification({ taskDesc: `BTC Price: $${btcPrice}` });
                await sleep(delay);
            }
        });
    };

    const options = {
        taskName: 'Example',
        taskTitle: 'ExampleTask title',
        taskDesc: 'ExampleTask description',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#ff00ff',
        linkingURI: 'yourSchemeHere://chat/jane',
        parameters: {
            delay: 5000,
        },
    };

    const startBackgroundService = async () => {
        // Fetch initial BTC price before starting the background service
        await fetchBtcPrice();

        await BackgroundService.start(veryIntensiveTask, options);
        await BackgroundService.updateNotification({ taskDesc: `BTC Price: $${btcPrice.toFixed(2)}` });
    };

    const stopBackgroundService = async () => {
        await BackgroundService.stop();
    };

    return (
        <View>
            <Text style={{textAlign:'center'}}>BTC Price: ${btcPrice}</Text>
            <TouchableOpacity
                style={{
                    borderRadius: 20,
                    padding: 20,
                    marginTop: 20,
                    backgroundColor: 'green',
                }}
                onPress={() => startBackgroundService()}
            >
                <Text style={{ color: '#fff' }}>Start Background Service</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    borderRadius: 20,
                    padding: 20,
                    marginTop: 20,
                    backgroundColor: 'red',
                }}
                onPress={() => stopBackgroundService()}
            >
                <Text style={{ color: '#fff' }}>Stop Background Service</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MyNewServiceTwo

const styles = StyleSheet.create({})