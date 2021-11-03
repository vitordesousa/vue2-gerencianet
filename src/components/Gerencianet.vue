<template>
	<div class="container">
		<div class="row" v-if="messages != ''">
			<div class="col-lg-12 card mb-4 pb-3">
				<h2 class="py-3 px-2">Mensagens do sistema</h2>
				<ul class="list-group list-group-flush">
					<li :class="`list-group-item  list-group-item-${message.type}`" v-for="message in messages" :key="message.text">{{message.text}}</li>
				</ul>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<div class="mb-3">
					<label for="payee_code" class="form-label">Payee Code (<a href="https://cdn.discordapp.com/attachments/652136190006525955/809138574549188618/identificador-conta.jpg">Veja onde</a>)</label>
					<input type="text" class="form-control" id="payee_code" v-model="payee_code" placeholder="Digite o Código da sua conta">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-6">
				<div class="mb-3">
					<label for="brand" class="form-label">Bandeira do Cartão</label>
					<input type="text" class="form-control" id="brand" v-model="cardData.brand" placeholder="Digite a Bandeira do Cartão">
				</div>
			</div>
			<div class="col-lg-6">
				<div class="mb-3">
					<label for="number" class="form-label">Número do Cartão</label>
					<input type="text" class="form-control" id="number" v-model="cardData.number" placeholder="Digite o Número do Cartão">
				</div>
			</div>
			<div class="col-lg-6">
				<div class="mb-3">
					<label for="cvv" class="form-label">CVV</label>
					<input type="text" class="form-control" id="cvv" v-model="cardData.brand" placeholder="Digite o CVV do Cartão" maxlength="4">
				</div>
			</div>
			<div class="col-lg-6">
				<div class="mb-3">
					<label for="expiration_month" class="form-label">Mês de Expiração do Cartão</label>
					<input type="text" class="form-control" id="expiration_month" v-model="cardData.expiration_month" placeholder="Digite o Mês de Expiração do Cartão" maxlength="2">
				</div>
			</div>
			<div class="col-lg-6">
				<div class="mb-3">
					<label for="expiration_year" class="form-label">Número do Cartão</label>
					<input type="text" class="form-control" id="expiration_year" v-model="cardData.expiration_year" placeholder="Digite o Mês de Expiração do Cartão" maxlength="4">
				</div>
			</div>
			<div class="col-lg-6 pt-4">
				<p class="alert alert-info">*Os dados do cartão são fictícios e utilizados na documentação da Gerencianet</p>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<div class="d-grid gap-2">
					<button class="btn btn-primary" id="btnSend" @click="gerarToken()">Gerar token</button>
				</div>
			</div>
		</div>
		<div class="row my-2" v-show="salt != ''">
			<div class="col-lg-12">
				<hr>
				<div class="d-grid gap-2">
					<label for="salt" class="form-label">Salt</label>
					<input type="text" class="form-control" id="salt" v-model="salt" readonly>
				</div>
			</div>
		</div>
		<div class="row my-2" v-show="chave_publica != ''">
			<div class="col-lg-12">
				<div class="d-grid gap-2">
					<label for="chave_publica" class="form-label">Chave Pública</label>
					<textarea name="chave_publica" id="chave_publica" cols="30" rows="4" readonly v-model="chave_publica"></textarea>
				</div>
			</div>
		</div>
		<div class="row my-2" v-show="dados_cartao_encriptado != ''">
			<div class="col-lg-12">
				<div class="d-grid gap-2">
					<label for="dados_cartao_encriptado" class="form-label">Dados do cartão encriptados</label>
					<textarea name="dados_cartao_encriptado" id="dados_cartao_encriptado" cols="30" rows="4" readonly v-model="dados_cartao_encriptado"></textarea>
				</div>
			</div>
		</div>
		<div class="row my-2" v-show="mascara_cartao != ''">
			<div class="col-lg-12 bg-success text-white pb-4 pt-2">
				<div class="d-grid gap-2">
					<label for="mascara_cartao" class="form-label">Máscara do Cartão</label>
					<input type="text" class="form-control" id="mascara_cartao" v-model="mascara_cartao" readonly>
				</div>
			</div>
		</div>
		<div class="row my-2" v-show="hash_cartao != ''">
			<div class="col-lg-12 bg-success text-white pb-4 pt-2">
				<div class="d-grid gap-2">
					<label for="hash_cartao" class="form-label">Hash do Cartão</label>
					<input type="text" class="form-control" id="hash_cartao" v-model="hash_cartao" readonly>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {JSEncrypt} from 'jsencrypt'
	export default {
		data(){
			return {
				messages			:	[],
				payee_code			:	'',
				cardData			:	{
					brand				:	'visa', // bandeira do cartão
					number				:	'4012001038443335', // número do cartão
					cvv					:	'123', // código de segurança
					expiration_month	:	'05', // mês de vencimento
					expiration_year		:	'2021' // ano de vencimento
				},

				salt					:	'',
				chave_publica			:	'',
				dados_cartao_encriptado	:	'',
				mascara_cartao			:	'',
				hash_cartao				:	'',
			}
		},
		methods : {
			gerarToken(){
				// reseta as variaveis
				this.messages					= []
				this.salt						= ''
				this.chave_publica				= ''
				this.dados_cartao_encriptado	= ''
				this.mascara_cartao				= ''
				this.hash_cartao				= ''

				// seta variaveis
				let that = this
				let payee_code = that.payee_code;

				// executa
				Promise.all([
					that.getSalt(payee_code), that.getPublicKey(payee_code)
				])
				.then(function(resultPromises){
					console.log('resultPromises', resultPromises)
					
					//let pay_token = process.env.gn_payee_code;
					var cardData = {
						brand: that.cardData.brand, // bandeira do cartão
						number: that.cardData.number, // número do cartão
						cvv: that.cardData.cvv, // código de segurança
						expiration_month: that.cardData.expiration_month, // mês de vencimento
						expiration_year: that.cardData.expiration_year, // ano de vencimento
						salt:	resultPromises[0].data
					};

					//that.cardData.salt = resultPromises[0].data
					//console.log('---', that.cardData)
					Promise.all([that.getCardDataEncrypted(resultPromises[1].data, cardData)]).then(function(resultPromises2){
						console.log('resultPromises2', resultPromises2)
						that.saveCardData(payee_code, resultPromises2[0])
					})
				})
			},

			getSalt(payee_code){
				let that = this
				return new Promise((resolve, reject) => {
					fetch('/salt', {
						method : 'GET',
						mode	:	'no-cors',
						headers : [
							['account-code', payee_code]
						]
					}).then(function(response){
						return response.json();
					}).then(function(response){
						if(response.data){
							that.salt = response.data
							console.log('response getPublicKey', response)
							that.messages.push({type:'success', text: 'Sucesso ao obter: "Salt"'})
							resolve(response)
						} else {
							that.messages.push({type:'danger', text: `Erro ao obter: "Chave Pública" (${response.error_description})`})
							return false;
						}
					}).catch(function(error){
						that.messages.push({type:'danger', text: 'Erro ao obter: "Salt"'})
						console.error('error getSalt', error)
						reject(error)
					})
				});
			},
			getPublicKey(payee_code){
				let that = this
				return new Promise((resolve, reject) => {
					fetch('/v1/pubkey?code=' + payee_code, {
						method : 'GET',
						mode	:	'no-cors'
					}).then(function(response){
						return response.json();
					}).then(function(response){
						if(response.data){
							console.log('response getPublicKey', response)
							that.messages.push({type:'success', text: 'Sucesso ao obter: "Chave Pública"'})
							that.chave_publica = response.data
							resolve(response)
						} else {
							that.messages.push({type:'danger', text: `Erro ao obter: "Chave Pública" (${response.error_description})`})
							return false;
						}
					}).catch(function(error){
						console.error('error getPublicKey', error)
						that.messages.push({type:'danger', text: 'Erro ao obter: "Chave Pública"'})
						reject(error)
					})
				});
			},
			async getCardDataEncrypted(publicKey, cardData){
				let that = this
				let crypt = new JSEncrypt();

				try {
					crypt.setPublicKey(publicKey);
					var encryptedCardData = crypt.encrypt(JSON.stringify(cardData));
					that.messages.push({type:'success', text: 'Sucesso ao obter: "Cartão Encriptado"'})
					console.log('encryptedCardData', encryptedCardData);
					that.dados_cartao_encriptado = encryptedCardData
					return encryptedCardData;
				} catch (e) {
					console.log('error getCardDataEncrypted', e)
					that.messages.push({type:'danger', text: 'Erro ao obter: "Cartão Encriptado"'})
				}
			},
			saveCardData(pay_token, cardDataEncrypted){
				let that = this
				return new Promise((resolve, reject) => {
					let data = JSON.stringify({ "data": cardDataEncrypted })
					fetch('/card', {
						method	:	'POST',
						body	:	data,
						headers : 	{
							'account-code': pay_token,
							'Content-Type': 'application/json',
						},
					}).then(function(response){
						return response.json();
					}).then(function(response){
						if(response.data){							
							console.log('saved', response)
							that.messages.push({type:'success', text: 'Sucesso ao obter: "Máscara do Cartão"'})
							that.messages.push({type:'success', text: 'Sucesso ao obter: "Hash do Cartão"'})
							that.mascara_cartao = response.data.card_mask;
							that.hash_cartao = response.data.payment_token;
							resolve(response)
						} else {
							that.messages.push({type:'danger', text: `Erro ao obter: "Chave Pública" (${response.error_description})`})
							return false;
						}
					}).catch(function(error){
						console.error('error saveCardData', error)
						that.messages.push({type:'danger', text: 'Erro ao obter: "Máscara do Cartão"'})
						that.messages.push({type:'danger', text: 'Erro ao obter: "Hash do Cartão"'})
						reject(error)
					})
				});
			},
		}

	}
</script>