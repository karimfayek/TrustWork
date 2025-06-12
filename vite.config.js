import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
	 server: {
        host: 'work.eit-host.com',  // Add this to force IPv4 only
       // https: {
        //    key: fs.readFileSync('C:/certs/elfisalt.key'),
         //   cert: fs.readFileSync('C:/certs/elfisalt.crt'),
        //},
    },
    plugins: [laravel({
        input: 'resources/js/app.jsx',
        refresh: true,
    }), react(), flowbiteReact()],
});