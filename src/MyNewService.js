import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import BackgroundService from 'react-native-background-actions';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const MyNewService = () => {
    const [counter, setCounter] = useState(0);
    // You can do anything in your task such as network requests, timers and so on,
    // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
    // React Native will go into "paused" mode (unless there are other tasks running,
    // or there is a foreground app).
    const veryIntensiveTask = async (taskDataArguments) => {
      // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise(async (resolve) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                console.log(i);
                // Update the counter state
                setCounter(i);
                await BackgroundService.updateNotification({ taskDesc: 'my counter is running' + i });
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
        // Reset the counter to 0 when starting the background service
        setCounter(0);
        await BackgroundService.start(veryIntensiveTask, options);
        await BackgroundService.updateNotification({ taskDesc: 'my counter is running' });
    };

    const stopBackgroundService = async () => {
        // Stop the background service and reset the counter to 0
        await BackgroundService.stop();
        setCounter(0);
    };

    return (
        <View>
            <Text>Counter: {counter}</Text>
            <TouchableOpacity
                style={{
                    borderRadius: 20,
                    padding: 20,
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

export default MyNewService;

const styles = StyleSheet.create({});
