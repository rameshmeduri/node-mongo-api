export default {
  getInstance(Model) {
    return {
      create(obj) {
        return obj.save();
      },

      find(query) {
        return Model.find(query).exec();
      },

      update(obj) {
        return Model
          .findOneAndUpdate({ name: obj.name }, obj, { new: true })
          .exec();
      },

      remove(query) {
        return Model
          .findOneAndRemove(query)
          .exec();
      },
    };
  },
};
