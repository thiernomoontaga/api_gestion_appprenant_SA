export default class BaseController {
    async create(req, res, next) {
        try {
            const data = this.createSchema.parse(req.body);
            const entity = await this.service.create(data);
            res.status(201).json(entity);
        }
        catch (err) {
            next(err);
        }
    }
    async getAll(req, res) {
        const entities = await this.service.findAll();
        res.status(200).json(entities);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const entity = await this.service.findById(Number(id));
        if (!entity)
            return res.status(404).json({ error: "Non trouvé" });
        res.status(200).json(entity);
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const data = this.updateSchema.parse(req.body);
            const entity = await this.service.update(Number(id), data);
            res.status(200).json(entity);
        }
        catch (err) {
            next(err);
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        await this.service.delete(Number(id));
        res.status(204).send();
    }
}
