import { spawn } from 'child_process';

export const runPythonScript = (imageData: Buffer): Promise<Record<string, any>> => {
    return new Promise((resolve, reject) => {
        const python = spawn('python3', ['src/pythonscript/digitize.py']); // Ensure correct path

        let output = '';
        let errorOutput = '';

        python.stdout.on('data', (data) => {
            output += data.toString();
        });

        python.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        python.on('close', (code) => {
            if (code !== 0) {
                console.error('Python script errors:', errorOutput);
                reject(new Error(`Python script exited with code ${code}: ${errorOutput}`));
                return;
            }

            try {
                const result = JSON.parse(output);
                resolve(result);
            } catch (parseError) {
                reject(new Error('Failed to parse Python script output.'));
            }
        });

        // Ensure buffer is not empty before sending
        if (!imageData || imageData.length === 0) {
            reject(new Error('Image buffer is empty.'));
            return;
        }

        python.stdin.write(imageData);
        python.stdin.end();
    });
};