// controllers/materialController.js
import { Material } from "../models/Material.js";
export const materialController = {
    crear: async(req,res)=>{ try{ await Material.crear(req.body.nombre, req.body.descripcion); res.json({message:"Material creado"}); } catch(e){res.status(500).json({error:e.message});} },
    obtenerTodos: async(req,res)=>{ try{ res.json(await Material.obtenerTodos()); } catch(e){res.status(500).json({error:e.message});} },
    obtenerUno: async(req,res)=>{ try{ const d=await Material.obtenerUno(req.params.id); if(!d) return res.status(404).json({message:"Material no encontrado"}); res.json(d); } catch(e){res.status(500).json({error:e.message});} },
    actualizar: async(req,res)=>{ try{ await Material.actualizar(req.params.id, req.body); res.json({message:"Material actualizado"}); } catch(e){res.status(500).json({error:e.message});} },
    eliminar: async(req,res)=>{ try{ await Material.eliminar(req.params.id); res.json({message:"Material eliminado"}); } catch(e){res.status(500).json({error:e.message});} }
};
