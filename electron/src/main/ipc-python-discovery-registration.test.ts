// @vitest-environment node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';

it('registers each existing and discovery Python IPC handler exactly once', () => {
  const source = readFileSync(resolve(__dirname, 'ipc.ts'), 'utf8');
  for (const name of ['backendGetPythonRuntime', 'backendChoosePythonRuntime', 'backendUseManagedPython', 'backendDiscoverPythonRuntimes', 'backendUseDiscoveredPythonRuntime']) {
    expect(source.match(new RegExp(`ipcMain\\.handle\\(CHANNELS\\.${name}\\b`, 'g')) ?? [], name).toHaveLength(1);
  }
});
