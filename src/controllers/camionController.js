import { Camion } from "../models/Camion.js";

export const camionController = {
    crear: async (req, res) => {
        try {
            await Camion.crear(req.body.placas, req.body.chofer);
            res.json({ message: "Camión creado correctamente" });
        } catch (error) { res.status(500).json({ error: error.message }); }
    },
    obtenerTodos: async (req, res) => {
        try { res.json(await Camion.obtenerTodos()); } catch (e) { res.status(500).json({ error: e.message }); }
    },
    obtenerUno: async (req, res) => {
        try { 
            const dato = await Camion.obtenerUno(req.params.id);
            if(!dato) return res.status(404).json({message: "Camión no encontrado"});
            res.json(dato);
        } catch (e) { res.status(500).json({ error: e.message }); }
    },
    actualizar: async (req, res) => {
        try { await Camion.actualizar(req.params.id, req.body); res.json({message:"Camión actualizado"}); }
        catch(e){ res.status(500).json({error:e.message});}
    },
    eliminar: async (req,res)=>{
        try{ await Camion.eliminar(req.params.id); res.json({message:"Camión eliminado"});}
        catch(e){res.status(500).json({error:e.message});}
    }
};
