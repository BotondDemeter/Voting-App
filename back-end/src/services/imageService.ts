import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';


export const runPythonScript = (imagePath: string): Promise<Record<string, any>> => {
    return new Promise(async (resolve, reject) => {
       
        const pythonScriptPath = path.join(__dirname, '..', 'pythonscript', 'digitize.py');
        console.log('Executing Python Script:', pythonScriptPath);

        try {
          
            await fs.access(imagePath);
        } catch (error) {
            return reject(new Error(`Image file does not exist at path: ${imagePath}`));
        }

        const python = spawn('python3', [pythonScriptPath, imagePath]);

        let output = '';
        let errorOutput = '';

    
        python.stdout.on('data', (data) => {
            output += data.toString();
            console.log(output);
        });

        
        python.stderr.on('data', (data) => {
            errorOutput += data.toString();
            console.error(errorOutput);
        });

        
        python.on('close', async (code) => {
            
            try {
                await fs.unlink(imagePath);
            } catch (cleanupError) {
                console.error('Error cleaning up file:', cleanupError);
            }

            if (code !== 0) {
                console.error('Python Script Error:', errorOutput);
                return reject(new Error(`Python script exited with code ${code}: ${errorOutput}`));
            }

            try {
                const result = JSON.parse(output);
                resolve(result);
                console.log(result);
            } catch (parseError) {
                console.error('Error parsing Python output:', parseError);
                reject(new Error('Failed to parse Python script output.'));
            }
        });
    });
};