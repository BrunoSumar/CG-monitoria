<!DOCTYPE html>
<html lang="pt" dir="ltr">
    <head>
        <script src="./p5/p5.js"></script>
        <script src="./p5/p5.dom.min.js"></script>
        <script src="./p5/p5.sound.min.js"></script>
        <meta charset="utf-8">
        <title>Home - CG monitoria</title>
        <link rel="stylesheet" href="./css/base.css">
    </head>
    <body>

        <!-- Lateral -->
        <?php
            echo file_get_contents("./sidebar.html", false, NULL, 0, 70000) ;
         ?>
        <!-- Centro -->
        <div id="principal">
            <div id="conteudo">
                <!-- Breadcrumbs -->
                <div class="breadcrumbs">
                    <a class="path" href="./index.php">Home</a> /
                    <p class="path">Transformações</p> /
                </div>
                <hr>
                <!-- separar conteudo em .blocos -->
                <div class="bloco">
                    <h2>Transformações</h2>

                    <p>Transformções são operações que quando aplicadas a um objeto alteram sua forma, tamanho e posição. Isso nos permite representar um mesmo objeto de diferentes formas.</p>
                    <p>As principais transformações são as de translação, escala, rotação, reflexão e Cisalhamento. Logo abaixo há uma descrição sucinta do que cada uma delas faz e como realiza-las porém é importante saber que existe uma forma mais inteligente de se fazer transformações usando <a href="coordenadasHomogeneas.php">coordenadas homogêneas</a>.</p>
                </div>
                <div class="bloco">
                    <h2>Translação</h2>
                    <p>A transformação de translação como o nome indica causará um deslocamento. Ela pode ser feita ao se realizar uma soma vetorial do ponto a ser alterado com um vetor deslocamento, diferente das outras transformações que exigem uma multiplicação de matrizes. Essa diferença gera problomas que podem ser contornados ao se utilizar <a href="coordenadasHomogeneas.php">coordenadas homogêneas</a>.</p>
                    <div>
                        <div id="canvasTrans" class="right canvasHolder"></div>
                        <p style="padding-top: 2em;">Para cada ponto P da figura ao lado realizamos a seguinte operação (você pode alterar os valores da trasnformação):</p>
                        <table>
                            <tr>
                                <td>P' = P + [</td>
                                <td><input id="transX" type="text" value="25">, </td>
                                <td><input id="transY" type="text" value="20"></td>
                                <td>]</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="bloco">
                    <h2>Escala</h2>
                    <p>A transformação de escala altera as proporções do objeto transformado. Ela pode ser feita através da multiplicação do valor das coordenadas de um ponto por um fator de escala. Podemos representa-la pela multiplicação do ponto pela matriz de escala a seguir.</p>
                    <div>
                        <div id="canvasEsc" class="right canvasHolder"></div>
                        <p style="padding-top: 2em;">Para cada ponto P da figura ao lado realizamos a sehuinte operação (você pode alterar os valores da trasnformação):</p>
                        <table>
                            <tr>
                                <td>P' = M*P = </td>
                                <td class="m ml"><input id="sX" type="text" value="2">,</td>
                                <td class="m mr">0</td>
                                <td> * </td>
                                <td class="m ml mr"> P.x </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="m ml"> 0 ,</td>
                                <td class="m mr"><input id="sY" type="text" value="1.7"></td>
                                <td> </td>
                                <td class="m ml mr"> P.y </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="bloco">
                    <h2>Rotação</h2>
                    <p>A transformação de rotação gira o objeto ao redor de um ponto. Existem diversas maneiras de se fazer uma rotação, uma das mais simples é usando a matriz do exemplo a seguir e multiplica-la pelos pontos desejados. Note que essa matriz de rotação apenas rotaciona ao redor da origem, portanto para rotacionar ao redor de um ponto qualquer é preciso usa-la em conjunto da transformação de translação (transladando o ponto escolhido até a origem, rotacionando e depois transladando de volta a posição original).</p>
                    <div>
                        <div id="canvasRot" class="right canvasHolder"></div>
                        <p style="padding-top: 2em;">Para cada ponto P da figura ao lado realizamos a operação abaixo (você pode alterar os valores da trasnformação).</p>
                       <table>
                            <p style="font-size:1.4em;">Rotação em <input id="rot" type="text" value="60" class="inText"> grau(s).</p>
                            <tr>
                                <td> P' = M*P = </td>
                                <td class="m ml" id="r11"></td>
                                <td class="m mr" id="r12"></td>
                                <td> * </td>
                                <td class="m ml mr"> P.x </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="m ml" id="r21"></td>
                                <td class="m mr" id="r22"></td>
                                <td> </td>
                                <td class="m ml mr"> P.y </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="bloco">
                    <h2>Reflexão</h2>
                    <p>A transformação de reflexão espelhará o objeto a partir de um dos eixos, invertendo o valor de suas coordenadas. A matriz responsável por essa transformação está logo abaixo.</p>
                    <div>
                        <div id="canvasReflex" class="right canvasHolder"></div>
                        <p style="padding-top: 2em;">Para cada ponto P da figura ao lado realizamos a seguinte operação (você pode alterar os valores da trasnformação).</p>
                        <table>
                            <p style="font-size:1.4em;">
                                Refletir x:<input id="reX" type="checkbox" value="1">,
                                refletir y:<input id="reY" type="checkbox" value="1" checked>.
                            </p>
                            <tr>
                                <td> P' = M*P = </td>
                                <td class="m ml" id="ref1"></td>
                                <td class="m mr"> 0 </td>
                                <td> * </td>
                                <td class="m ml mr"> P.x </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="m ml"> 0 </td>
                                <td class="m mr" id="ref2"></td>
                                <td> </td>
                                <td class="m ml mr"> P.y </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="bloco-final">
                    <h2>Cisalhamento</h2>
                    <p>A transformação de cisalhamento distorce o formato de um objeto. Ela faz isso alterando o valor de uma coordenada baseada no valor de outra. A matriz responsável por essa transformação está logo abaixo.</p>
                    <div>
                        <div id="canvasCis" class="right canvasHolder"></div>
                        <p style="padding-top: 2em;">Para cada ponto P da figura ao lado realizamos a seguinte operação (você pode alterar os valores da trasnformação).</p>

                        <table>
                            <tr>
                                <td>P' = M*P = </td>
                                <td class="m ml">1</td>
                                <td class="m mr"><input id="cisX" type="text" value="0"></td>
                                <td> * </td>
                                <td class="m ml mr"> P.x </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="m ml"><input id="cisY" type="text" value="1.3"></td>
                                <td class="m mr">1</td>
                                <td> </td>
                                <td class="m ml mr"> P.y </td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        </div>
        <!-- javascript -->
        <script src="./js/base.js"></script>
        <script src="./js/transformacoes.js"></script>
    </body>
</html>
