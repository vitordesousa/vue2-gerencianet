module.exports = {
	devServer: {
		proxy: {
			'^/salt': {
				target: 'https://tokenizer.gerencianet.com.br/',
			},
			'^/v1': {
				target: 'https://sandbox.gerencianet.com.br/'
			},
			'^/card': {
				target: 'https://sandbox.gerencianet.com.br/v1/'
			}
		}
	}

}

/**
 * Rotas: 
 * - Salt = https://tokenizer.gerencianet.com.br/salt (Dev e Prod)    [GET]
 
 * - Public Key = https://sandbox.gerencianet.com.br/v1/pubkey?code=SEU_CODIGO_DO_USUARIO (Dev)   [GET]
 * - Public Key = https://api.gerencianet.com.br/v1/pubkey?code=SEU_CODIGO_DO_USUARIO (Prod)
 
 * - Token do Cartão = https://sandbox.gerencianet.com.br/card (Dev)   [POST]
 * - Token do Cartão = https://tokenizer.gerencianet.com.br/card (Prod)
 */