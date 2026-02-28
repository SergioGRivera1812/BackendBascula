// controllers/choferController.js
import { Chofer } from "../models/Chofer.js";

export const choferController = {
    crear: async(req,res)=>{ try{ await Chofer.crear(req.body.nombre, req.body.telefono); res.json({message:"Chofer creado"}); } catch(e){res.status(500).json({error:e.message});} },
    obtenerTodos: async(req,res)=>{ try{ res.json(await Chofer.obtenerTodos()); } catch(e){res.status(500).json({error:e.message});} },
    obtenerUno: async(req,res)=>{ try{ const d = await Chofer.obtenerUno(req.params.id); if(!d) return res.status(404).json({message:"Chofer no encontrado"}); res.json(d); } catch(e){res.status(500).json({error:e.message});} },
    actualizar: async(req,res)=>{ try{ await Chofer.actualizar(req.params.id, req.body); res.json({message:"Chofer actualizado"}); } catch(e){res.status(500).json({error:e.message});} },
    eliminar: async(req,res)=>{ try{ await Chofer.eliminar(req.params.id); res.json({message:"Chofer eliminado"}); } catch(e){res.status(500).json({error:e.message});} }
};
