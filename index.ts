import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";
import * as dotenv from 'dotenv';
// import FluenceController from "./src/controller/fluence-controller"
import  {runServer} from './src/main'

dotenv.config();

runServer();
