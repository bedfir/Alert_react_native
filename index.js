import { ExpoRoot } from "expo-router";
import { registerRootComponent } from 'expo';

export function App() {
    const ctx = require.context("./src/app");
    return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);