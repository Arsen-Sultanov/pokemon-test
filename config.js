module.exports = {
  server: {
    port: 8000,
    salt: '$2a$10$FiOm83RS.72Elo5Te.NX5uD54GT7dK3NTrUN3zjKajSxq2DdOmuQu',
    db: {
      baseUrl: 'mongodb://localhost',
      port: 27017,
      name: 'pokemon',
      username: '',
      password: '',
      fullUrl() { return `${this.baseUrl}:${this.port}/${this.name}`; }
    },
    session: {
      secret: 'aec1289a0d8c38197a880dd46a24ba60',
      cokieMaxAge: 45600000000
    },
    soc: {
      google: {
        clientID: '533163862841-2bi3a8s56no0ljakl3b0s56uran0imi6.apps.googleusercontent.com',
        clientSecret: 'jNhQQepz0_lXfmCfXUsdmFAV',
        callbackURL: 'http://localhost:8000/api/v1/sign/gmail/callback'
      }
    }
  }
};
