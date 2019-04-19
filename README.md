# How to run

- npm install
- npm run prestart
- npm run start:host
- access to `http://localhost:7071/api/DurableFunctionsHttpStart`

## Expect

The orchestrator function returns a string value "Error".
Because ErrorActivity function is always throw an Error, so always go to catch block.

```typescript
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
```

## Actual

The orchestrator function returns an array of Error information.

```
{
    "instanceId": "517a257544f5410ebb69fc98d994a644",
    "runtimeStatus": "Completed",
    "input": null,
    "customStatus": null,
    "output": [
        "Activity function 'ErrorActivity' failed: Result: Failure\nException: Error: Network error\nStack: Error: Network error\n    at Object.<anonymous> (C:\\Users\\xxx\\Documents\\Repos\\durable-js\\dist\\ErrorActivity\\index.js:23:15)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\xxx\\Documents\\Repos\\durable-js\\dist\\ErrorActivity\\index.js:17:71\n    ...snip..."
    ],
    "createdTime": "2019-04-19T02:10:43Z",
    "lastUpdatedTime": "2019-04-19T02:10:45Z"
}
```

