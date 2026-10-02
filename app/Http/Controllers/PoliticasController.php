<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PoliticasController extends Controller
{
    public function privacidade() {
        $texto = '
            <h2>Política de Privacidade</h2>
            <p>Em razão do comprometimento com sua segurança e privacidade, nós, da <strong>UNICASA INDÚSTRIA DE MÓVEIS S/A (“UNICASA”)</strong>, CNPJ 90.441.460/0001-48, apresentamos nossa Política de Privacidade. Este documento foi criado com o intuito de tornar nossa relação mais transparente acerca do tratamento de dados pessoais de usuários e clientes, onde apresentaremos as informações necessárias sobre a coleta, uso, armazenamento e exclusão das informações de Titulares de Dados que utilizam nosso site, conforme as normas da Lei Geral de Proteção de Dados Pessoais – LGPD (Lei nº 13.709/2018) e demais legislações aplicáveis. <br>
            A Unicasa obriga-se ao disposto na presente Política de Privacidade, mantendo o compromisso com o titular de seguir as regras de proteção de dados vigentes no Brasil e Estados Unidos, bem como observar os princípios trazidos pelo art. 6º da LGPD, em especial o princípio do livre acesso como garantia de consulta facilitada e gratuita aos titulares sore a forma e duração do tratamento, bem como a integralidade de seus dados pessoais.<br>
            Caso persista alguma dúvida sobre este documento ou sobre o tratamento de seus dados pessoais, entre em contato com nosso <strong>Encarregado de Dados (DPO), a CLRA Consultoria, </strong>na pessoa<strong> </strong>da sócia Flávia Coêlho Leite<strong> </strong>através do e-mail<strong> </strong>privacidade@unicasamoveis.com.br.</p>
            <br>
            <ol start="1" type="1">
                <li><strong>GLOSSÁRIO</strong></li>
            </ol>
            <br>
            <p><strong>Dados Pessoais</strong><br>
            São quaisquer informações relacionadas à pessoa natural identificada ou identificável, tais como nome completo, números de documentos pessoais e profissionais, assinaturas, telefone, dados de localização, endereço eletrônico, dentre outros. </p>
            <p><strong>Dados Pessoais Sensíveis</strong><br>
                São dados sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico, quando vinculado a uma pessoa natural.</p>
            <p><strong>Tratamento de Dados Pessoais</strong><br>
                Toda operação realizada com dados pessoais, como as que se referem a coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração.</p>
            <p><strong>Titular</strong><br>
                Pessoa natural a quem se referem os dados pessoais que são objeto de tratamento.</p>
            <br><strong>Agentes de Tratamento</strong>
            <ul>
                <li>Controlador: pessoa natural ou jurídica, de direito público ou privado, a quem competem as decisões referentes ao tratamento de dados pessoais.</li>
                <li>Operador: pessoa natural ou jurídica, de direito público ou privado, que realiza o tratamento de dados pessoais em nome do controlador.</li>
                <li>Suboperador: aquele contratado pelo operador para auxiliá-lo a realizar o tratamento de dados pessoais em nome do controlador. </li>
            </ul>
            <p><strong>Pseudonimização</strong><br>
                Tratamento por meio do qual um dado perde a possibilidade de associação, direta ou indireta, a um indivíduo. Ex.: utilizar o CPF com números e letras para dificultar sua visualização (111.xxx.23x.444-xx).<br></p>
            <p><strong>Anonimização</strong><br>
                Utilização de meios técnicos por meio dos quais um dado perde a possibilidade de associação, direta ou indireta, a um indivíduo.</p>
            <br>
            <ol start="2" type="1">
                <li><u>Quais dados pessoais a UNICASA COLETA?</u></li>
            </ol>
            <p>Ao se cadastrar em nossos sites, a depender do serviço solicitado, podemos coletar dados pessoais como nome, informações para contato (e-mail e telefone), números de documentos pessoais, data de nascimento, estado civil, endereço, nacionalidade e escolaridade. Ao fornecer estes dados, você consente com os termos descritos nesta Política de Privacidade. </p>
            <br>
            <ol start="3" type="1">
                <li><u>Qual a previsão legal para o uso de dados pessoais pela UNICASA?</u></li>
            </ol>
            <p>Quando o titular se cadastra em nossas plataformas e fornece dados pessoais para que a UNICASA entre em contato, sendo este para atendimento, orçamento ou investimento, consideramos a hipótese de consentimento, demonstrado o interesse do cliente/parceiro em obter1 nossos serviços.&nbsp; A UNICASA se atentará a responder o que foi solicitado estritamente para atender à finalidade indicada.<br>
                Em sendo um consumidor de uma das lojas autorizadas pela Unicasa, tratamos seus dados pessoais com a finalidade da execução de contrato, bem como cumprimento de obrigação legal ou regulatória. Nesta hipótese, os dados pessoais do consumidor também poderão ser tratados pela Unicasa para atender ao seu legítimo interesse, com o intuito de avaliar a satisfação do produto e atendimento dos lojistas.<br>
                A UNICASA ainda se reserva o direito de tratar os dados pessoais pelo período necessário para exercício regularem processos (administrativos, judiciais ou arbitrais), caso venham a ocorrer. Por fim, a UNICASA também poderá tratar dados pessoais com base na proteção do crédito, conforme disposto na LGPD e demais legislações aplicáveis.</p>
            <br>
            <ol start="4" type="1">
                <li><u>Como meus Dados Pessoais são armazenados? </u></li>
            </ol>
            <p>A UNICASA reforça seu compromisso com a segurança e confidencialidade dos dados pessoais com padrões rígidos, mantendo-os armazenados em local seguro, e com acesso restrito. Estes dados são acessados e mantidos apenas pelo período necessário para o alcance da finalidade de armazenamento. Finalizado o período, realizamos o processo de exclusão ou anonimização dos dados, observados os prazos prescricionais e decadenciais, de acordo com o art. 16 da LGPD.</p>
            <br>
            <ol start="5" type="1">
                <li><u>Qual é o procedimento da UNICASA quanto à anonimização ou exclusão de dados pessoais?</u></li>
            </ol>
            <p>Após o término do período estipulado pela legislação para o tratamento de dados pessoais de acordo com a sua finalidade, estes serão excluídos de maneira segura ou anonimizados, conforme estabelece o art. 16 da LGPD. Note que serão observados os prazos prescricionais e decadenciais previstos em lei.</p>
            <br>
            <ol start="6" type="1">
                <li><u>Meus dados podem ser compartilhados?</u></li>
            </ol>
            <p>Exceto em casos de determinação legal ou judicial, transações financeiras e administrativas decorrentes do uso e prestação de serviços, ou em caso de solicitação de portabilidade pelo titular, nunca serão transferidos dados pessoais a terceiros ou usados para finalidades diferentes daquelas para os quais foram coletados. </p>
            <br>
            <ol start="7" type="1">
                <li><u>Quais são os direitos do titular sobre seus dados pessoais?</u></li>
            </ol>
            <p>Observando o princípio do livre acesso, a UNICASA garante consulta facilitada e gratuita sobre a forma e a duração do tratamento, bem como a integralidade de seus dados pessoais. Conforme estabelece o art. 18 da LGPD, são direitos do Titular:</p>
            <ul type="circle">
                <li>A informação sobre a possibilidade de não fornecer consentimento, bem como as consequências da negativa;</li>
                <li>A revogação do consentimento a qualquer momento, em todo ou em parte, quando aplicável;</li>
                <li>O acesso aos dados e a confirmação da existência de tratamento, bem como a correção destes se incompletos ou desatualizados;</li>
                <li>A portabilidade dos dados a outro fornecedor de pedido ou produto, mediante requisição expressa;</li>
                <li>A anonimização, bloqueio e eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD;</li>
                <li>Informações sobre entidades com as quais a empresa realizou uso compartilhado de dados ou entidades com as quais os dados foram compartilhados, bem como a finalidade deste.</li>
            </ul>
            <br>
            <ol start="8" type="1">
                <li><u>Qual o procedimento da UNICASA em caso de incidentes com dados pessoais?</u></li>
            </ol>
            <p>Em compromisso com a privacidade do titular, mantemos políticas rígidas de segurança e comunicaremos ao titular e a Autoridade Nacional de Proteção de Dados (ANPD) a ocorrência de incidente de segurança que possa trazer risco ou dano relevante ao seu titular em prazo razoável. <br>
                A UNICASA considera essencial manter padrões elevados de segurança para garantir ao titular de dados pessoais o devido tratamento, com base em boas práticas e governança nos sistemas utilizados.</p>
            <br>
            <ol start="9" type="1">
                <li><u>Em quais casos pode ocorrer a transferência internacional de dados pessoais pela UNICASA?</u></li>
            </ol>
            <p>A UNICASA, por medidas de segurança, utiliza de servidores internacionais da Microsoft para tratar dados pessoais de maneira segura em conformidade com os arts. 30 e 46 da GDPR (<em>General Data Protection Regulation</em> – Regulamento Geral de Proteção de Dados da União Europeia). Desta forma, o tratamento pela UNICASA está de acordo com o art. 33 da LGPD, que dispõe sobre a possibilidade de transferência de dados pessoais para países que proporcionem grau de proteção similar ao previsto na LGPD. Através destes servidores internacionais, pode ser feita a transferência de dados com empresas do mesmo grupo econômico, como por exemplo, a UNICASA <em>North America</em> - escritório de representação da marca nos Estados Unidos. Estes dados podem ser transferidos para atingir finalidades previstas pela LGPD como cumprimento de obrigação legal ou regulatória, execução de contrato ou exercício regular de direitos em processo judicial, administrativo ou arbitral, bem como para atender aos interesses legítimos do controlador.<u></u></p>
            <br>
            <ol start="10" type="1">
                <li><u>Alterações desta Política de Privacidade</u></li>
            </ol>
            <p>A UNICASA reserva-se o direito de modificar esta Política de Privacidade sem prévia comunicação. As alterações entram em vigor a partir da data de publicação, sendo esta 20/01/2022. Recomendamos que nosso site seja visitado periodicamente para que você se mantenha atualizado quanto aos novos termos, tendo em vista que a fruição de nossos serviços, bem como inscrições utilizando seus dados pessoais implica no consentimento desta política.</p>
        ';

        return Inertia::render('PoliticaPrivacidade', [
            'texto' => $texto
        ]);
    }
    
    public function cookies() {
        $texto = '
            <p><strong>O que são cookies?</strong></p>
            <p>Um cookie é uma pequena sequência de texto que um site envia ao navegador e salva em seu computador quando você visita sites da Internet. Os cookies são  utilizados para permitir que o site opere de forma mais eficiente e melhore o seu desempenho, mas também para fornecer informações ao proprietário do site.<br>
            <br>
            Os cookies são utilizados para diversos fins, têm diferentes características e  podem ser utilizados pelo proprietário do site que você está visitando ou por  terceiros.<br>
            Abaixo você encontrará todas as informações sobre os cookies instalados através  deste site, bem como as instruções necessárias sobre como gerenciar suas  preferências em relação aos mesmos.<br>
            <br>
            Para obter mais informações sobre cookies e suas funções gerais, visite um site  informativo, por exemplo <a href="https://pt.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)">https://pt.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)</a> .</p>
            <p><strong>Cookies  usados por este site</strong><br>
            A utilização de cookies pelo proprietário deste site, Unicasa Indústria de Móveis – Endereço: BR 470 Km 212, 930 São Vendelino, Bento Gonçalves – RS.  905707-540 - Brasil, faz parte da Política de Privacidade do referido - para  todas as informações relativas à nossa Política de Privacidade, clique <a href="http://www.newmoveis.com.br/sejalojista26/politica"><strong>AQUI</strong></a>.<br>
            <br>
            <strong>Cookies técnicos que não requerem consentimento:</strong></p>
            <table border="1" bordercolor="#686667" cellspacing="0" cellpadding="0" width="100%">
                <tbody>
                    <tr>
                        <td><p align="center">Cookie</p></td>
                        <td><p align="center">Descrição</p></td>
                        <td><p align="center">Categoria</p></td>
                        <td><p align="center">Tempo de Armazenamento</p></td>
                        <td><p align="center">Domínio</p></td>
                        <td><p>Usado</p></td>
                        <td><p align="center">Quem tem acesso à informação</p></td>
                    </tr>
                    <tr>
                        <td valign="top"><p align="center">privacy</p></td>
                        <td valign="top"><p align="center">Cookie de Personalização</p></td>
                        <td valign="top"><p>essencial</p></td>
                        <td valign="top"><p>1 ano</p></td>
                        <td valign="top"><p>newmoveis.com.br</p></td>
                        <td valign="top"><p>Em todo o site</p></td>
                        <td valign="top"><p>New Móveis</p></td>
                    </tr>
                    <tr>
                        <td valign="top"><p align="center">accept-3rdparty-1</p></td>
                        <td valign="top"><p align="center">Cookie de Personalização</p></td>
                        <td valign="top"><p>essencial</p></td>
                        <td valign="top"><p>1 ano</p></td>
                        <td valign="top"><p>newmoveis.com.br</p></td>
                        <td valign="top"><p>Em todo o site</p></td>
                        <td valign="top"><p>New Móveis</p></td>
                    </tr>
                    <tr>
                        <td valign="top"><p align="center">accept-retargeting-1</p></td>
                        <td valign="top"><p align="center">Cookie de Personalização</p></td>
                        <td valign="top"><p>essencial</p></td>
                        <td valign="top"><p>1 ano</p></td>
                        <td valign="top"><p>newmoveis.com.br</p></td>
                        <td valign="top"><p>Em todo o site</p></td>
                        <td valign="top"><p>New Móveis</p></td>
                    </tr>
                </tbody>
            </table>
            <br>
            <p><strong>Cookies  relacionados com as atividades de salvar preferências e otimização:</strong></p>
            <table border="1" bordercolor="#686667" cellspacing="0" cellpadding="0" width="100%">
                <tbody>
                    <tr>
                        <td><p align="center">Cookie</p></td>
                        <td><p align="center">Descrição</p></td>
                        <td colspan="2"><p align="center">Categoria</p></td>
                        <td><p align="center">Tempo de Armazenamento</p></td>
                        <td><p align="center">Domínio</p></td>
                        <td><p align="center">Usado em</p></td>
                        <td><p align="center">Quem tem acesso à informação</p></td>
                    </tr>
                    <tr>
                        <td valign="top"><p align="center">collection-models-view-arrange-mode</p></td>
                        <td valign="top"><p align="center">Cookie de Personalização</p></td>
                        <td valign="top"><p align="center">collection-models-view-arrange-mode</p></td>
                        <td colspan="2" valign="top"><p align="center">1 ano</p></td>
                        <td valign="top"><p align="center">newmoveis.com.br</p></td>
                        <td valign="top"><p align="center">Collections</p></td>
                        <td valign="top"><p align="center">New Móveis</p></td>
                    </tr>
                </tbody>
            </table>
            <p><br>
            O site também usa cookies estatísticos de terceiros (Google Analytics) para  coletar informações de forma agregada, definida como um cookie técnico, ou  seja, sem rastrear o IP do usuário (dados do usuário não apresentados no IP) e  sem compartilhar os dados com Terceiros.</p>
            <p><strong>Acesso  a informações de terceiros:</strong><br>
            Política  de privacidade: <a href="https://www.google.com/policies/privacy/">Política de Privacidade – Privacidade &amp;  Termos – Google/</a>&nbsp;<br>
            Política  de cookies: <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage">Uso de cookies do Google Analytics em sites</a>&nbsp;<br>
            Para  desativar: <a href="https://tools.google.com/dlpage/gaoptout?hl=it">Página de download do Add-on do navegador para  desativação do Google Analytics</a></p>
            <p>Todos  os cookies técnicos não requerem consentimento; portanto, eles foram instalados  automaticamente devido ao acesso ao site.</p>
            <p><strong>Cookies  de Redirecionamento</strong><br>
            São  utilizados para o envio de publicidade a sujeitos que já visitaram este site.  Você encontrará abaixo o nome de terceiros que gerenciam os cookies e para cada  um deles, o link da página onde pode receber informações sobre o seu  processamento e dar o seu consentimento.</p>
            <p><strong>Cookies  técnicos que não requerem consentimento:</strong><br>
            Cookies  relacionados com atividades estritamente necessárias para o funcionamento do  site e a prestação de serviços</p>
            <table border="1" bordercolor="#686667" cellspacing="0" cellpadding="0" width="100%">
                <tbody>
                    <tr>
                        <td><p>Cookie</p></td>
                        <td><p>Descrição</p></td>
                        <td><p>Categoria</p></td>
                        <td><p>Tempo de Armazenamento</p></td>
                        <td><p>Domínio</p></td>
                        <td><p>Usado para</p></td>
                        <td><p>Quem tem acesso à informação</p></td>
                    </tr>
                    <tr>
                        <td valign="top"><p>Facebook Pixel</p></td>
                        <td valign="top"><p>Retargeting e LookLike</p></td>
                        <td valign="top"><p>CRM</p></td>
                        <td valign="top"><p>1 ano</p></td>
                        <td valign="top"><p>facebook.com</p></td>
                        <td valign="top"><p>Todo o site</p></td>
                        <td valign="top"><p>New Móveis</p></td>
                    </tr>
                    <tr>
                        <td valign="top"><p>Linkedin Pixel</p></td>
                        <td valign="top"><p>Retargeting e LookLike</p></td>
                        <td valign="top"><p>CRM</p></td>
                        <td valign="top"><p>1 ano</p></td>
                        <td valign="top"><p>Linkedin.com</p></td>
                        <td valign="top"><p>Todo o site</p></td>
                        <td valign="top"><p>New Móveis</p></td>
                    </tr>
                    <tr>
                        <td valign="top"><p>Pinterest Pixel</p></td>
                        <td valign="top"><p>Retargeting e LookLike</p></td>
                        <td valign="top"><p>CRM</p></td>
                        <td valign="top"><p>1 ano</p></td>
                        <td valign="top"><p>Pinterest.com</p></td>
                        <td valign="top"><p>Todo o site</p></td>
                        <td valign="top"><p>New Móveis</p></td>
                    </tr>
                    <tr>
                        <td valign="top"><p>Houzz<br>
                        Pixel</p></td>
                        <td valign="top"><p>Retargeting e LookLike</p></td>
                        <td valign="top"><p>CRM</p></td>
                        <td valign="top"><p>1 ano</p></td>
                        <td valign="top"><p>Houzz.com</p></td>
                        <td valign="top"><p>Todo o site</p></td>
                        <td valign="top"><p>New Móveis</p></td>
                    </tr>
                    <tr>
                        <td valign="top"><p>Instagram<br>
                        Pixel</p></td>
                        <td valign="top"><p>Retargeting e LookLike</p></td>
                        <td valign="top"><p>CRM</p></td>
                        <td valign="top"><p>1 ano</p></td>
                        <td valign="top"><p>Instagram.com</p></td>
                        <td valign="top"><p>Todo o site</p></td>
                        <td valign="top"><p>New Móveis</p></td>
                    </tr>
                </tbody>
            </table>
            <br>
            <div class="et_pb_contact">
                <div class="form__row">
                    <div class="form__group">
                        <span class="et_pb_contact_field_options_title">Privacidade e Política</span>
                    </div>
                </div>

                <div class="form__row" style="margin-top: 10px;">
                    <div class="form__group">
                        <span class="et_pb_contact_field_options_list"><span class="et_pb_contact_field_checkbox">
                            <input type="radio" id="et_pb_contact_field_4_0_0" name="cookies-accept" class="input" value="I consent" data-id="-1">
                            <label for="et_pb_contact_field_4_0_0"><i></i>Eu aceito</label>
                        </span></span>
                    </div>
                </div>

                <div class="form__row" style="margin-top: 0;">
                    <div class="form__group">
                        <span class="et_pb_contact_field_options_list"><span class="et_pb_contact_field_checkbox">
                            <input type="radio" id="et_pb_contact_dsad_1_0" name="cookies-accept" class="input" value="I do not consent" data-id="-1">
                            <label for="et_pb_contact_dsad_1_0"><i></i>Eu não aceito</label>
                        </span></span>
                    </div>
                </div>

                <div class="form__row" style="margin-top: -30px;">
                    <div class="form__group">
                        <button type="submit" name="et_builder_submit_button" class="et_builder_submit_button form__submit btn mx-auto" style="cursor: pointer;border: none;text-decoration: none;background-color: #111111;font-size: initial;text-align: center;padding: 5px 10px;line-height: 30px;color: white;">Salvar</button>
                </div>
            </div>
            <div class="et_pb_contact--feedback" style="margin: 20px 0; display: none;">
                <span class="et_pb_contact_field_options_title">Obrigado pelo feedback!</span>
            </div>
            <br>
            <p><strong>Interação  com redes sociais e plataformas externas</strong><br>
            <br>
            Lembre-se de que você pode gerenciar suas preferências de cookies também por  meio do navegador.<br>
            Se  você não sabe o tipo e a versão do navegador que está usando, clique em  "Ajuda" na janela do navegador na parte superior, lá você pode  acessar todas as informações necessárias.<br>
            Se você conhece seu navegador, clique naquele que está usando para acessar a  página de gerenciamento de cookies.<br>
            <br>
            Internet Explorer <a href="http://windows.microsoft.com/en-us/windows-vista/block-or-allow-cookies">Eliminar e gerir cookies (microsoft.com)</a> <br>
            Google Chrome <a href="http://windows.microsoft.com/en-us/windows-vista/block-or-allow-cookies">https://support.google.com/chrome/answer/95647?hl=pt-pt</a> <br>
            Mozilla  Firefox <a href="http://windows.microsoft.com/en-us/windows-vista/block-or-allow-cookies">Desative cookies de terceiros no Firefox para  impedir alguns tipos de rastreamento por anunciantes | Ajuda do Firefox  (mozilla.org)</a> <br>
            Safari <a href="http://windows.microsoft.com/en-us/windows-vista/block-or-allow-cookies">Limpar o histórico e os cookies do Safari no  iPhone, iPad ou iPod&nbsp;touch - Suporte da Apple (BR)</a></p>
            </div>
        ';

        return Inertia::render('PoliticaCookies', [
            'texto' => $texto
        ]);
    }
};