<template>
	<div class="container">
		<div class="row" v-if="messages != ''">
			<div class="col-lg-12 card mb-5">
				<h2 class="py-3 px-2">Mensagens do sistema</h2>
				<ul class="list-group list-group-flush">
					<li class="list-group-item" v-for="message in messages" :key="message">{{message}}</li>
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
					<textarea name="chave_publica" id="chave_publica" cols="30" rows="4" readonly></textarea>
				</div>
			</div>
		</div>
		<div class="row my-2" v-show="dados_carta_encriptado != ''">
			<div class="col-lg-12">
				<div class="d-grid gap-2">
					<label for="dados_carta_encriptado" class="form-label">Dados do cartão encriptados</label>
					<textarea name="dados_carta_encriptado" id="dados_carta_encriptado" cols="30" rows="4" readonly></textarea>
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
				dados_carta_encriptado	:	'',
				mascara_cartao			:	'',
				hash_cartao				:	'',
			}
		},
		methods : {
			gerarToken(){

			}
		}

	}
</script>