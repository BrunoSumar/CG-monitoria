<!DOCTYPE html>
<html lang="pt" dir="ltr">
    <head>
        <script src="./p5/p5.js"></script>
        <script src="./p5/p5.dom.min.js"></script>
        <script src="./p5/p5.sound.min.js"></script>
        <meta charset="utf-8">
        <title>Home - CG monitoria</title>
        <link rel="stylesheet" href="./css/base.css">
        <link rel="stylesheet" href="./css/coordH.css">
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
                    <h2>Coordenadas homogêneas</h2>
                    <p>o sistema de coordenadas homogenêas utiliza um componente a mais que o sistema de cartesiano para representar um ponto, tal nos permite diferenciar um ponto de uma direção. A conversão de coordenadas homogêneas para o sistema cartesiano é feita ao dividir os primeiros valores pela última coordenada. Por exemplo se um ponto no sistema cartesiano é dado por P = [X,Y] seu correpondente no sistema de coordenadas cartesiano seria P' = [X', Y', w] em que X = X'/w e y = Y'/w. No sistema de coordenadas homogêneas dois pontos multiplos entre si representam o mesmo ponto no sistema cartesiano.</p>
                    <p>Como essa converção de valores envolve dividir por w , ele deveria ser diferente de 0, mas M=0 é usado como uma representação de coordenadas cujo w TENDE a zero ,ou seja pontos no infinito.</p>
                    <p>Cordenadas homogêneas podem ser usadas para facilitar a composição de transformações. Na <span><a href="transformacoes.php">descrição das principais transformações</a></span> foi mostrado que apenas a translação não é feita através da multiplicação de matrizes, isso faz com que a palicação da translação ocorra de forma separada do restante, porém com coordenadas homogêneas é possível gerar uma matriz de tanslação.</p>
                    <p>Abaixo você uma lista de trasnformações e suas respectivas matrizes.</p>
                </div>
                <div class="bloco">
                    <h2>Translação</h2>
                    <div>
                        <div id="canvasTrans" class="right canvasHolder"></div>
                        <p style="padding-top: 2em;">Para cada ponto P da figura ao lado realizamos a seguinte operação (você pode alterar os valores da trasnformação):</p>
                        <table style="text-align:center;">
                            <tr>
                                <td>P' = M*P = </td>
                                <td class="m ml">1 ,</td>
                                <td> 0 ,</td>
                                <td class="m mr"><input id="transX" type="text" value="25"></td>
                                <td> * </td>
                                <td class="m ml mr"> P.x </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="m ml"> 0 ,</td>
                                <td>1 ,</td>
                                <td class="m mr"><input id="transY" type="text" value="20"></td>
                                <td> </td>
                                <td class="m ml mr"> P.y </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="m ml"> 0 ,</td>
                                <td> 0 ,</td>
                                <td class="m mr"> 1 </td>
                                <td> </td>
                                <td class="m ml mr">1</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="bloco">
                    <h2>Escala</h2>
                    <div>
                        <div id="canvasEsc" class="right canvasHolder"></div>
                        <p style="padding-top: 2em;">Para cada ponto P da figura ao lado realizamos a sehuinte operação (você pode alterar os valores da trasnformação):</p>
                        <table>
                            <tr>
                                <td>P' = M*P = </td>
                                <td class="m ml"><input id="sX" type="text" value="2">,</td>
                                <td class="m"> 0 ,</td>
                                <td class="m mr">0</td>
                                <td> * </td>
                                <td class="m ml mr"> P.x </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="m ml"> 0 ,</td>
                                <td class="m"><input id="sY" type="text" value="1.7">,</td>
                                <td class="m mr">0</td>
                                <td> </td>
                                <td class="m ml mr"> P.y </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="m ml"> 0 ,</td>
                                <td> 0 ,</td>
                                <td class="m mr"> 1 </td>
                                <td> </td>
                                <td class="m ml mr">1</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="bloco">
                    <h2>Rotação</h2>
                    <div>
                        <div id="canvasRot" class="right canvasHolder"></div>
                        <p style="padding-top: 2em;">Para cada ponto P da figura ao lado realizamos a operação abaixo (você pode alterar os valores da trasnformação).</p>
                       <table>
                            <p style="font-size:1.4em;">Rotação em <input id="rot" type="text" value="60" class="inText"> grau(s).</p>
                            <tr>
                                <td> P' = </td>
                                <td class="m ml" id="r11"></td>
                                <td class="m" id="r12"></td>
                                <td class="m mr">0</td>
                                <td> * </td>
                                <td class="m ml mr"> P.x </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="m ml" id="r21"></td>
                                <td class="m" id="r22"></td>
                                <td class="m mr">0</td>
                                <td> </td>
                                <td class="m ml mr"> P.y </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="m ml"> 0 ,</td>
                                <td class="m"> 0 ,</td>
                                <td class="m mr"> 1</td>
                                <td> </td>
                                <td class="m ml mr">1</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="bloco">
                    <h2>Reflexão</h2>
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
                                <td class="m ml" id="ref1">,</td>
                                <td class="m "> 0 </td>
                                <td class="m mr"> 0 </td>
                                <td> * </td>
                                <td class="m ml mr"> P.x </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="m ml"> 0 </td>
                                <td class="m" id="ref2"></td>
                                <td class="m mr"> 0 </td>
                                <td> </td>
                                <td class="m ml mr"> P.y </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="m ml"> 0 </td>
                                <td class="m"> 0 </td>
                                <td class="m mr"> 1 </td>
                                <td> </td>
                                <td class="m ml mr">1</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="bloco">
                    <h2>Cisalhamento</h2>
                    <div>
                        <div id="canvasCis" class="right canvasHolder"></div>
                        <p style="padding-top: 2em;">Para cada ponto P da figura ao lado realizamos a seguinte operação (você pode alterar os valores da trasnformação).</p>

                        <table>
                            <tr>
                                <td>P' = M*P = </td>
                                <td class="m ml">1 ,</td>
                                <td class="m"><input id="cisX" type="text" value="0">,</td>
                                <td class="m mr">0</td>
                                <td> * </td>
                                <td class="m ml mr"> P.x </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="m ml"><input id="cisY" type="text" value="1.3">,</td>
                                <td class="m">1 ,</td>
                                <td class="m mr">0</td>
                                <td> </td>
                                <td class="m ml mr"> P.y </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="m ml"> 0 ,</td>
                                <td class="m"> 0 ,</td>
                                <td class="m mr"> 1</td>
                                <td> </td>
                                <td class="m ml mr">1</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="bloco-final">
                    <h2>Composição de transformações</h2>
                    <br>
                    <p>Agora que é possível representar todas as transformações de forma similar experimente combina-las.(dica: "- sen 90" = -sen(90°))</p>
                    <br>
                    <div>
                        <div id="canvasComp" class="canvasHolder left"></div>
                        <div id="matrixHolder">
                            <button id="addBtn" onclick="addTabela(this)" >Adicionar transformação</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <!-- javascript -->
        <script src="./js/base.js"></script>
        <script src="./js/transformacoes.js"></script>
        <script src="./js/coordenadasHomogeneas.js"></script>
    </body>
</html>
<!-- --
<div>
      <table>
          <tr>
                <td > <input type="text"></td>
                <td > <input type="text"></td>
                <td > <input type="text"></td>
          </tr>
          <tr>
                <td > <input type="text"></td>
                <td > <input type="text"></td>
                <td > <input type="text"></td>
          </tr>
          <tr>
                <td > <input type="text"></td>
                <td > <input type="text"></td>
                <td > <input type="text"></td>
          </tr>
    </table>
    <button onclick="removeTabela(this)">X<button>
</div>

---->
