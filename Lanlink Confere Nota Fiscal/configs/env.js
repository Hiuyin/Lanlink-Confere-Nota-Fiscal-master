if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'development'
}

const production = {
    server: {
        host: 'LLK85SH20113',
        port: '1235'
    },
    database: {
        user: 'UsuarioPesquisa',
        host: '10.85.1.61',
        pass: '!Q@W#E1q2w3e',
        name: 'Sapiens',
        dialect: 'mssql',
        //tableDoc: 'documentoCRM',
        //tableContract: 'ContratosSapiens'
        table: 'sapiens.usu_vconnfent'
    },
    active: {
        url: 'ldap://for.lanlink.com.br',
        basedn: 'dc=for,dc=lanlink,dc=com,dc=br',
        user: 'FORTALEZA\\F1303901',
        pass: 'gEG2IQ8bSO'
    }
}

const development = {
    server: {
        host: '10.85.50.152',
        port: '3000'
    },
    database: {
        user: 'UsuarioPesquisa',
        host: '10.85.1.61',
        pass: '!Q@W#E1q2w3e',
        name: 'Sapiens',
        dialect: 'mssql',
        //tableDoc: 'documentoCRM',
        //tableContract: 'ContratosSapiens'
        table: 'sapiens.usu_vconnfent',
        // dialectOptions: {
        //     instanceName: 'llk85sh20133',
        // }
        },
        active: {
            url: 'ldap://for.lanlink.com.br',
            basedn: 'dc=for,dc=lanlink,dc=com,dc=br',
            user: 'FORTALEZA\\F1303901',
            pass: 'gEG2IQ8bSO'
    }
}

const env = {
    production,
    development
}

if (!env[process.env.NODE_ENV]) {
    throw new Error('Envirollment não foi definido!')
}

module.exports = env[process.env.NODE_ENV]