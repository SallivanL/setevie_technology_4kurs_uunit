const TariffModel = require('../../models/tariff.model');
const { badRequest, notFound } = require('../../utils/errors');

class TariffService {
  list() { return TariffModel.query().select('id', 'name', 'student_count', 'cost').orderBy('id'); }

  async create(data) {
    const clean = validateTariff(data);
    return TariffModel.query().insert(clean).returning(['id', 'name', 'student_count', 'cost']);
  }

  async update(id, data) {
    const clean = validateTariff(data);
    const count = await TariffModel.query().patch(clean).where({ id }).returning(['id', 'name', 'student_count', 'cost']);
    if (!count.length) throw notFound('Тариф не найден');
    return count[0];
  }

  async remove(id) {
    const deleted = await TariffModel.query().deleteById(id);
    if (!deleted) throw notFound('Тариф не найден');
    return { id: Number(id), deleted: true };
  }
}

function validateTariff(data) {
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const studentCount = Number(data.student_count ?? data.studentCount);
  const cost = Number(data.cost);
  if (!name || name.length > 120 || !Number.isInteger(studentCount) || studentCount < 1 || !Number.isFinite(cost) || cost < 0) {
    throw badRequest('Тариф должен содержать name, student_count > 0 и cost >= 0');
  }
  return { name, student_count: studentCount, cost };
}

exports.TariffService = TariffService;
