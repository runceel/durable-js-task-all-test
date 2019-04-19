/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

import * as df from "durable-functions"

const orchestrator = df.orchestrator(function* (context) {
    try {
        const tasks = [];
        tasks.push(context.df.callActivity("ErrorActivity"));
        tasks.push(context.df.callActivity("ErrorActivity"));
        return yield context.df.Task.all(tasks);
    } catch (e) {
        return "Error";
    }
});

export default orchestrator;
