/* eslint-disable @typescript-eslint/no-unused-vars */
import { createServer, RestSerializer, Serializer, Server } from 'miragejs';

const ApplicationSerializer = Serializer.extend({
  // will always serialize the ids of all relationships for the model or collection in the response
  serializeIds: 'always',
  serialize(resource, request) {
    // eslint-disable-next-line prefer-rest-params
    const json = (Serializer.prototype as any).serialize.apply(this, arguments);
    const root = resource.models ? this.keyForCollection(resource.modelName) : this.keyForModel(resource.modelName);
    return json[root];
  },
});

export default (): Server => {
  return createServer({
    serializers: {
      application: RestSerializer.extend({
        root: false,
        embed: true,
      }),
    },

    models: {},

    factories: {},

    seeds(server) {
      server.db.loadData({});
    },

    routes() {
      this.namespace = '/rest';
    },
  });
};
