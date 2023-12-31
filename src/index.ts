import 'dotenv/config';

import fastify, { FastifyInstance } from 'fastify';
import compress                     from "@fastify/compress";
import helmet                       from "@fastify/helmet";

/////////////////////////////////////////////////////////////
//
// Fastify / Server Configuration
//
/////////////////////////////////////////////////////////////

const PORT : number          = 3008;
const HOST : String          = `localhost`;
const app  : FastifyInstance = fastify({ logger: false });

/////////////////////////////////////////////////////////////
//
// Fastify / Server Routes
//
/////////////////////////////////////////////////////////////

import rOSINT     from '@route/rOSINT';

/////////////////////////////////////////////////////////////

async function main(fastify: FastifyInstance) {

    fastify.register(compress);
    fastify.register(helmet);

    rOSINT(fastify);

    fastify.listen({port: PORT}, (err, address) => {

        if (err) { console.error(err); process.exit(1); }
    });
}

main(app).then(r => { console.log(`[${new Date().toLocaleString()}] | Server started and listening at [${HOST}:${PORT}]`); });