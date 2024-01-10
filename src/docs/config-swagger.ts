import { Router } from "express";
import { serve, setup } from 'swagger-ui-express';
import docs from ".";

export function docsRoute() {
    const router = Router();

    router.use('/', serve, setup(docs))

    return router;
}