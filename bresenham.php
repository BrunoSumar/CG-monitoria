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
                    <a class="path" href="./index.html">Home</a> /
                    <a class="path" href="./rasterizacao.html">Rasterização</a> /
                    <p class="path">Bresenham</p>
                </div>
                <hr>
                <!-- separar conteudo em .blocos -->
                <div class="bloco">
                    <h2>Rasterização de retas - Algoritmo de Bresenham</h2><br>
                    <p>O algoritmo de rasterização de retas de Bresenham, assim como o <spam><a src ="dda.php">DDA</a></spam>, a partir de duas posições no espaço gera um conjunto discreto de pontos ligando essas posições (basicamente nos diz quais pixels pertecem a um segmento de reta). Esse algoritmo busca ser mais otimizado ao evitar operações com números de ponto flutuante e suas aproximações.<br></p>
                    <p>O algoritmo se baseia numa derivação da equação de reta que passa pelos pontos escolhidos, que chamaremos de  P1 e P2. considerando f(x)=y=mx+n como sendo a equação que define a reta, em que m=variação de y/variação de x e n=f(0), podemos transforma la na função composta f(x,y)=Ax+By+C, em que A=dy, B=-dx e C=n*dx, dessa forma para cada pixel temos uma valor associado que para pontos abaixo da reta é positivo, acima da reta negativo e exatamente sobre a reta igual a zero. </p>
                    <div style="text-align:center;"><img src="img/bresenham2.png" alt="derivação função composta." height="300" style="margin:0 auto;"></div>
                    <p>Com essa informação partindo de um ponto conhecido da reta podemos verificar o ponto médio dos próximos dois pixels a direita e descobrir qual deles está mais perto da reta.</p>
                    <div style="text-align:center;"><<img src="img/bresenham1.png" alt="buscamos o valor da função para x+1 e y+0,5." height="400"></div>
                    <p>A variação de f(x,y) para f(x+1,y+0.5) é de A+B/2.</p>
                    <div style="text-align:center;"><<img src="img/bresenham3.png" alt="diferença entra funções." height="240"></div>
                    <p>Sabendo isso podemos evitar calcular f(x+1,y+0.5) para cada ponto. Uma vez tomada a decisão avançamos para o ponto escolhido que podem ser [x+1,y] ou [x+1,y+1].</p>
                    <div style="text-align:center;"><<img src="img/bresenham4.png" alt="diferença entra funções." height="150"></div>
                    <p>Partindo do ponto P1, cujo f(P1.x,P1.y)=0, calculamos f(P1.x+1,P1.y+.5) por A+B/2 e atribuimos seu valor a uma variável D, tomamos a decisão de qual próximo ponto da reta e atualizamos D. Isso se repete qté chegarmos em P2.</p>
                    <p>Os calculos antesriores são válidos apenas para segmentos de reta contidos no primeiro octante do plano cartesiano.
                    <p>Abaixo você pode conferir um pseudo-código desse algoritmo e um exemplo interativo de sua execução.</p>

                    <div class="codigo">
                        Bresenham(p1, p2)  //Algoritmo de Bresenham para primeiro octante<br>
                        {<br>
                            let dx = p2.x - p1; //variação em X<br>
                            let dy = p2.y - p1.y; //Varização em Y<br>
                        let D = 2*dy + dx;<br>
                        <br>
                        let y = p1.y;<br>
                        let listaDePontos = [];<br>
                        for(let x=p1.x;x!=p2.x;x++){<br>
                        listaDePontos.push([x,y]);<br>
                        if(D>0){<br>
                            D -= 2*dx;<br>
                            y++;<br>
                        }<br>
                        D += 2*dy;
                        }<br>
                            return listaDePontos;<br>
                        };<br>
                    </div>
                    <br>
                    <p> Clique e arraste os pontos para mudar sua posição</p>
                    <!-- Canvas -->
                    <div id="bresenham" class="canvasHolder wide tall">   </div>
                    <!-- output do canvas -->
                    <div class="dadosCanvas" id="saidaBresenham" >
                    </div>
                    <!-- Controles do canvas -->
                    <div class="controles">
                        <h4 class="sliderTitulo">Progresso:</h4>
                        <div class="sliderHolder">
                            <input type="range" min="0" max="100" name="status" class="slider" id="sp" value="0">
                        </div>
                        <h4 class="sliderTitulo">Tamanho da malha:</h4>
                        <div class="sliderHolder">
                            <input type="range" min="1" max="60" name="malha" class="slider" id="sm" value="30">
                        </div>

                        <label  for="cm" class="checkTitulo"><h4>Exibir Malha:</h4></label>
                        <div class="checkHolder">
                            <input type="checkbox" name="exibirMalha" id="cm">
                        </div>
                        <label for="pa" class="checkTitulo"><h4>Progresso automático:</h4></label>
                        <div class="checkHolder" >
                            <input class="check" type="checkbox" name="pAuto" id="pa">
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- javascript -->
        <script src="./js/base.js"></script>
        <script src="./js/bresenham.js"></script>


    </body>
</html>
