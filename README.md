# Gerador de Hash do cartão de crétido para o Gateway de Pagamentos Gerencianet utilizando Vue JS


## Instalando pacotes
```sh
npm install
```

### Rodando o servidor
```sh
npm run serve
```

## Documentação da Gerencianet
Veja [Referência](https://dev.gerencianet.com.br/docs/pagamento-com-cartao).

## Como utilizar
- Obtenha seu ***Payee Code*** no [site da gerencianet](https://cdn.discordapp.com/attachments/652136190006525955/809138574549188618/identificador-conta.jpg)
- Instale o pacote para visualizar a tela de demonstração
- Utilize o ***Payee Code*** na tela e clique em ***Gerar Token***
- Se tudo estiver correto, logo abaixo do botão será mostrado todo o processo de encriptação abaixo.

## Explicação do que acontece:
1 - É obtido o ***Salt*** com o seu ***Payee Code***
2 - É obtida a ***Chave Pública*** com o seu ***Payee Code***
3 - Os dados do cartão são encriptados com a lib ***JS Encrypt***
4 - O cartão criptografado é enviado para a ***Gerencianet*** e retornado o ***Hash do Cartão*** e a ***Máscara do Cartão***
5 - Esses dois últimos são necessários para enviar para a ***Gerencianet*** através da SDK escolhida e assim dar prosseguimento para a cobrança.


# Licença 
[https://github.com/gerencianet/gn-api-sdk-php#licen%C3%A7a](https://github.com/gerencianet/gn-api-sdk-php#licen%C3%A7a)