this.main = this.main || {};
this.main.js = (function (exports) {
  'use strict';

  //vector function
  function vec3(...args) {
      return new _vec3(...args);
  }
  //class '_vec3'
  class _vec3 {
      constructor(x, y, z) {
          if (x == undefined)
            this.x = 0, this.y = 0, this.z = 0;
          else       
             if (typeof x == 'object')
               if (x.lenght == 3)
                 this.x = x[0], this.y = x[1], this.z = x[2];
                else 
                  this.x = x.x, this.y = x.y, this.z = x.z;
             else 
                if (y == undefined || z == undefined)
                this.x = x, this.y = x, this.z == x;
                else
                this.x =x, this.y = y, this.z = z;
              }

      dot(v) {
       return this.x * v.x + this.y * v.y + this.z * v.z;
      }
      add(v){
          if (typeof v == 'number')
            return vec3(this.x + v, this.y + v, this.z + v);
          else
            return vec3(this.x + v.x, this.y + v.y, this.z + v.z); 
      }
       sub(v){
          if (typeof v == 'number')
            return vec3(this.x - v, this.y - v, this.z - v);
          else
            return vec3(this.x - v.x, this.y - v.y, this.z - v.z); 
        }

      mulNum(n){
          return vec3(this.x * n, this.y * n, this.z * n);
      }

      normalise() {
          let len = this.x * this.x + this.y * this.y + this.z * this.z;
          
          if (len != 0 && len != 1)
          {
              len = Math.sqrt(len);
              return vec3(this.x / len, this.y / len, this.z / len);
          }
          return vec3(this); 
      }

      cross(v){
        return vec3( this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x); 
    } 
  } //End of class '_vec3'

  function D2R(A) {
      return A * Math.PI / 180;
  }

  //matrix function
  function mat4(...args) {
      return new _mat4(...args);
  } //End of 'mat4' function

  //class '_mat4'
  class _mat4 {
      constructor(m = null) {
          if (m == null)
            this.m = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
          else if (typeof m == 'object' && m.lenght == 4)
            this.m = m;
            else
              this.m = m.m;
      }

      //Translate
         setTranslate(dx, dy, dz) {
            if (dx == undefined)
              dx = 0, dy = 0, dz = 0;
            else if (typeof x == 'object')
              if (dx.lenght == 3)
                dx = x[0], dy = x[1], dz = x[2];
              else 
                dx = x.x, dy = x.y, dz = x.z;
              if (dy == undefined || dz == undefined)
                dx = dx, dy = dx;
              this.m = [[1, 0, 0, 0],[0, 1, 0, 0],[0, 0, 1, 0],[dx, dy, dz, 1]];
          return this;
      };

      //Transpose
      setTranspose() {
           this.m = [[this.m[0][0], this.m[1][0], this.m[2][0], this.m[3][0]], [this.m[0][1], this.m[1][1], this.m[2][1], this.m[3][1]], 
           [this.m[0][2], this.m[1][2], this.m[2][2], this.m[3][2]], [this.m[0][3], this.m[1][3], this.m[2][3], this.m[3][3]]];
           return this;
      };

      //Mul matrix
      mulMatr(m) {
          this.m = [[this.m[0][0] * m.m[0][0] + this.m[0][1] * m.m[1][0] + this.m[0][2] * m.m[2][0] + this.m[0][3] * m.m[3][0],
                     this.m[0][0] * m.m[0][1] + this.m[0][1] * m.m[1][1] + this.m[0][2] * m.m[2][1] + this.m[0][3] * m.m[3][1],
                     this.m[0][0] * m.m[0][2] + this.m[0][1] * m.m[1][2] + this.m[0][2] * m.m[2][2] + this.m[0][3] * m.m[3][2],
                     this.m[0][0] * m.m[0][3] + this.m[0][1] * m.m[1][3] + this.m[0][2] * m.m[2][3] + this.m[0][3] * m.m[3][3]],

                    [this.m[1][0] * m.m[0][0] + this.m[1][1] * m.m[1][0] + this.m[1][2] * m.m[2][0] + this.m[1][3] * m.m[3][0],
                     this.m[1][0] * m.m[0][1] + this.m[1][1] * m.m[1][1] + this.m[1][2] * m.m[2][1] + this.m[1][3] * m.m[3][1],
                     this.m[1][0] * m.m[0][2] + this.m[1][1] * m.m[1][2] + this.m[1][2] * m.m[2][2] + this.m[1][3] * m.m[3][2],
                     this.m[1][0] * m.m[0][3] + this.m[1][1] * m.m[1][3] + this.m[1][2] * m.m[2][3] + this.m[1][3] * m.m[3][3]],
   
                    [this.m[2][0] * m.m[0][0] + this.m[2][1] * m.m[1][0] + this.m[2][2] * m.m[2][0] + this.m[2][3] * m.m[3][0],
                     this.m[2][0] * m.m[0][1] + this.m[2][1] * m.m[1][1] + this.m[2][2] * m.m[2][1] + this.m[2][3] * m.m[3][1],
                     this.m[2][0] * m.m[0][2] + this.m[2][1] * m.m[1][2] + this.m[2][2] * m.m[2][2] + this.m[2][3] * m.m[3][2],
                     this.m[2][0] * m.m[0][3] + this.m[2][1] * m.m[1][3] + this.m[2][2] * m.m[2][3] + this.m[2][3] * m.m[3][3]],

                   [this.m[3][0] * m.m[0][0] + this.m[3][1] * m.m[1][0] + this.m[3][2] * m.m[2][0] + this.m[3][3] * m.m[3][0],
                    this.m[3][0] * m.m[0][1] + this.m[3][1] * m.m[1][1] + this.m[3][2] * m.m[2][1] + this.m[3][3] * m.m[3][1],
                    this.m[3][0] * m.m[0][2] + this.m[3][1] * m.m[1][2] + this.m[3][2] * m.m[2][2] + this.m[3][3] * m.m[3][2],
                    this.m[3][0] * m.m[0][3] + this.m[3][1] * m.m[1][3] + this.m[3][2] * m.m[2][3] + this.m[3][3] * m.m[3][3]]];

         return this;
      }; //End of 'mulmatr' function

      //Inverse
      matrDeterm3x3(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
         return m11 * m22 * m33 + m12 * m23 * m31 + m13 * m21 * m32 - m11 * m23 * m32 - m12 * m21 * m33 - m13 * m22 * m31;
       };//End of 'MatrDeterm3x3' function 

       matrDeterm() {
          return this.m[0][0] * this.matrDeterm3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                                                   this.m[2][1], this.m[2][2], this.m[2][3],
                                                   this.m[3][1], this.m[3][2], this.m[3][3]) +
                -this.m[0][1] * this.matrDeterm3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                                                   this.m[2][0], this.m[2][2], this.m[2][3],
                                                   this.m[3][0], this.m[3][2], this.m[3][3]) +
                +this.m[0][2] * this.matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                                                   this.m[2][0], this.m[2][1], this.m[2][3],
                                                   this.m[3][0], this.m[3][1], this.m[3][3]) +
                -this.m[0][3] * this.matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                                                   this.m[2][0], this.m[2][1], this.m[2][2],
                                                   this.m[3][0], this.m[3][1], this.m[3][2]);
  } // End of 'matrDeterm' function 

      setInverse() {
        let det = this.matrDeterm();
      
        if (det == 0)
          this.m = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        else {
        this.m[0][0] = this.matrDeterm3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                       this.m[2][1], this.m[2][2], this.m[2][3],
                       this.m[3][1], this.m[3][2], this.m[3][3]) / det;
      
        this.m[1][0] = -this.matrDeterm3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                        this.m[2][0], this.m[2][2], this.m[2][3],
                        this.m[3][0], this.m[3][2], this.m[3][3]) / det;
      
        this.m[2][0] = this.matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                       this.m[2][0], this.m[2][1], this.m[2][3],
                       this.m[3][0], this.m[3][1], this.m[3][3]) / det;
      
        this.m[3][0] = -this.matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                        this.m[2][0], this.m[2][1], this.m[2][2],
                        this.m[3][0], this.m[3][1], this.m[3][2]) / det;
      
        this.m[0][1] = -this.matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                        this.m[2][1], this.m[2][2], this.m[2][3],
                        this.m[3][1], this.m[3][2], this.m[3][3]) / det;
      
        this.m[1][1] = this.matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                       this.m[2][0], this.m[2][2], this.m[2][3],
                       this.m[3][0], this.m[3][2], this.m[3][3]) / det;
      
        this.m[2][1] = -this.matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                        this.m[2][0], this.m[2][1], this.m[2][3],
                        this.m[3][0], this.m[3][1], this.m[3][3]) / det;
      
        this.m[3][1] = this.matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                       this.m[2][0], this.m[2][1], this.m[2][2],
                       this.m[3][0], this.m[3][1], this.m[3][2]) / det;
      
      
        this.m[0][2] = this.matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                       this.m[1][1], this.m[1][2], this.m[1][3],
                       this.m[3][1], this.m[3][2], this.m[3][3]) / det;
     
        this.m[1][2] = -this.matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                        this.m[1][0], this.m[1][2], this.m[1][3],
                        this.m[3][0], this.m[3][2], this.m[3][3]) / det;
      
        this.m[2][2] = this.matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                       this.m[1][0], this.m[1][1], this.m[1][3],
                       this.m[3][0], this.m[3][1], this.m[3][3]) / det;
      
        this.m[3][2] = -this.matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                        this.m[1][0], this.m[1][1], this.m[1][2],
                        this.m[3][0], this.m[3][1], this.m[3][2]) / det;
         
        this.m[0][3] = -this.matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                        this.m[1][1], this.m[1][2], this.m[1][3],
                        this.m[2][1], this.m[2][2], this.m[2][3]) / det;
      
        this.m[1][3] = this.matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                       this.m[1][0], this.m[1][2], this.m[1][3],
                       this.m[2][0], this.m[2][2], this.m[2][3]) / det;
      
        this.m[2][3] = -this.matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                        this.m[1][0], this.m[1][1], this.m[1][3],
                        this.m[2][0], this.m[2][1], this.m[2][3]) / det;
     
        this.m[3][3] = this.matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                       this.m[1][0], this.m[1][1], this.m[1][2],
                       this.m[2][0], this.m[2][1], this.m[2][2]) / det;
        } 
        return this; 
      };
      
       matrView(loc, at, up1) {
        let
         dir = at.add(loc.mulNum(-1)).normalise(),
         right = dir.cross(up1).normalise(),
         up = right.cross(dir);
         
         this.m = [[right.x, up.x, -dir.x, 0],
                  [right.y, up.y, -dir.y, 0],
                  [right.z, up.z, -dir.z, 0],
                  [-loc.dot(right), -loc.dot(up), loc.dot(dir), 1]];
        return this;
       };

       matrFrustrum(l, r, t, b, n, f) {
        this.m = [[ 2 * n / (r - l), 0, 0, 0 ],
                 [ 0, 2 *  n / (t - b), 0, 0 ],
                 [ (r + l) / (r - l), (t + b) / (t - b), (f + n) / (n - f), -1 ],
                 [ 0, 0, 2 * n * f / (n - f), 0]];
        return this;
       };

       matrRotateX(angle) {
          let a = D2R(angle);
          this.m = [[1, 0, 0, 0],
                    [0, Math.cos(a), Math.sin(a), 0],
                    [0, -Math.sin(a), Math.cos(a), 0],
                    [0, 0, 0, 1]];
          return this;
      };


       matrRotateY(angle) {
        let a = D2R(angle);
        this.m = [[Math.cos(a), 0, -Math.sin(a), 0],
                  [0, 1, 0, 0],
                  [Math.sin(a), 0, Math.cos(a), 0],
                  [0, 0, 0, 1]];
        return this;
       };

       matrRotateZ(angle) {
        let a = D2R(angle);
         this.m = [[Math.cos(a), Math.sin(a), 0, 0],
                   [-Math.sin(a), Math.cos(a), 0, 0],
                   [0, 0, 1, 0],
                   [0, 0, 0, 1]];
         return this;
       };

       matrScale(v) {
        this.m = [[v.x, 0, 0, 0],
                  [0, v.y, 0, 0],
                  [0, 0, v.z, 0],
                  [0, 0, 0, 1]];
        return this;        
       };

       toArray() {
        return [].concat(...this.m);
       };
      }

  //Camera function
  function cam(loc, at, up, frameW, frameH) {
      return new _cam(loc, at, up, frameW, frameH);
  }
  //class '_cam'
  class _cam {
      constructor(loc, at, up, frameW, frameH)
      {
          this.loc = vec3(loc);
          this.at = vec3(at);
          this.matrProj = mat4();
          this.matrView = mat4().matrView(loc, at, up);
          this.matrVP = this.matrView.mulMatr(this.matrProj);
          this.frameW = frameW;
          this.frameH = frameH;

          this.right = vec3(this.matrView.m[0][0], this.matrView.m[1][0], this.matrView.m[2][0]);
          this.up = vec3(this.matrView.m[0][1], this.matrView.m[1][1], this.matrView.m[2][1]);
          this.dir = vec3(-this.matrView.m[0][2],-this.matrView.m[1][2], -this.matrView.m[2][2]);
      }

       camSetProj(size, dist, farClip) {
              let rx = size, ry = size;
              this.projSize = size;
              this.projDist = dist;
              this.farClip = farClip;

              if (this.frameW >= this.frameH)
                  rx *= this.frameW / this.frameH;
              else
                  ry *= this.frameH / this.frameW;

              this.wp = rx;
              this.hp = ry;
              this.matrProj = this.matrProj.matrFrustrum(-rx / 2, rx / 2, -ry / 2, ry / 2, this.projDist, this.farClip); 
              this.matrVP.mulMatr(this.matrView, this.matrProj);
              return this;
              }; 

          camSetSize(frameW, frameH) {
              this.frameW = frameW;
              this.frameH = frameH;
              return this.camSetProj()
          };

          camRespounse(){
              
          }
      }
   //End of '_cam' class

  //let matrwLoc, matrwnormLoc, matrwvpLoc, 
  let timeLoc;

  function vert(pos)
  {
    return new _vertex(pos);
  }

  class _vertex
    {
      constructor(pos)
      {
        this.p = pos;
        this.n = vec3(0, 0, 0);
      }
    }

  function primitive(type, size)
  {
    return new _primitive(type, size);
  }

  class _primitive {
    constructor(type, size){
      this.trans = mat4();

      if (type == 'tetraeder')
        return this.tetraeder(size);
      else if (type == 'cube')
        return this.cube(size);
      else if (type == 'octaeder')
        return this.octaeder(size);
      else if (type == 'icosider')
        return this.icosider(size);
      else if (type == 'dedecader')
        return this.dedecader(size);
      }

    autoNormals() {
    let i;
    for (i = 0; i < this.vert.length; i++)
      this.vert[i].n = vec3(0, 0, 0);

    for (i = 0; i < this.vert.length; i += 3) {
      let p0 = this.vert[i].p, p1 = this.vert[i + 1].p, p2 = this.vert[i + 2].p;
      let N = ((p1.sub(p0)).cross(p2.sub(p0))).normalise();

      this.vert[i].n = this.vert[i].n.add(N);
      this.vert[i + 1].n = this.vert[i + 1].n.add(N);
      this.vert[i + 2].n = this.vert[i + 2].n.add(N);
    }
  /*
    for (i = 0; i < this.ind.length; i += 3) {
      let n0 = this.ind[i], n1 = this.ind[i + 1], n2 = this.ind[i + 2];
      let p0 = this.vert[n0].p, p1 = this.vert[n1].p, p2 = this.vert[n2].p;
      let N = ((p1.sub(p0)).cross(p2.sub(p0))).normalise();

      this.vert[n0].n = this.vert[n0].n.add(N);
      this.vert[n1].n = this.vert[n1].n.add(N);
      this.vert[n2].n = this.vert[n2].n.add(N);
    }
  */
    for (i = 0; i < this.vert.length; i++)
      this.vert[i].n = this.vert[i].n.normalise();
    }

     tetraeder(size)
      {      let sqrt3 = Math.sqrt(3), sqrt21 = Math.sqrt(21);
        this.vert = [vert(vec3(0, size * sqrt21 / 6, 0)), vert(vec3(0, 0, size * sqrt3 / 3)), vert(vec3(size / 2, 0, size * sqrt3 / 6)), vert(vec3(-size / 2, 0, size * sqrt3 / 6))];
        this.ind = [2, 1, 0, 0, 3, 2, 1, 3, 0, 3, 2, 1];
        return this;
      }
      
      cube(size){
        this.vert = [vert(vec3(-size / 2, -size / 2, size / 2)), vert(vec3(-size / 2, size / 2, size / 2)), vert(vec3(size / 2, size / 2, size / 2)), 
                     vert(vec3(size / 2, size / 2, size / 2)), vert(vec3(size / 2, -size / 2, size / 2)), vert(vec3(-size / 2, -size / 2, size / 2)),
                     vert(vec3(-size / 2, size / 2, size / 2)), vert(vec3(-size / 2, size / 2, -size / 2)), vert(vec3(size / 2, size / 2, -size / 2)),
                     vert(vec3(size / 2, size / 2, -size / 2)), vert(vec3(size / 2, size / 2, size / 2)), vert(vec3(-size / 2, size / 2, size / 2)),
                     vert(vec3(-size / 2, -size / 2, size / 2)), vert(vec3(-size / 2, -size / 2, -size / 2)), vert(vec3(size / 2, -size / 2, -size / 2)), 
                     vert(vec3(size / 2, -size / 2, -size / 2)), vert(vec3(size / 2, -size / 2, size / 2)), vert(vec3(-size / 2,-size / 2, size / 2)),
                     vert(vec3(size / 2, -size / 2, size / 2)), vert(vec3(size / 2, size / 2, size / 2)), vert(vec3(size / 2, size / 2, -size / 2)),
                     vert(vec3(size / 2, size / 2, -size / 2)), vert(vec3(size / 2, -size / 2, -size / 2)), vert(vec3(size / 2, size / 2,-size / 2, size / 2)),
                     vert(vec3(-size / 2, -size / 2, size / 2)), vert(vec3(-size / 2, size / 2, size / 2)), vert(vec3(-size / 2, size / 2, -size / 2)), 
                     vert(vec3(-size / 2, size / 2, -size / 2)), vert(vec3(-size / 2, -size / 2, -size / 2)), vert(vec3(-size / 2, -size / 2,size / 2)),
                     vert(vec3(-size / 2, -size / 2, -size / 2)), vert(vec3(-size / 2, size / 2, -size / 2)), vert(vec3(size / 2, size / 2, -size / 2)),
                     vert(vec3(size / 2, size / 2, -size / 2)), vert(vec3(size / 2, -size / 2, -size / 2)), vert(vec3(-size / 2, -size / 2, -size / 2)),
                    ];
        this.ind = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];//this.ind = [][3, 1, 0, 2, 1, 3, 7, 6, 2, 2, 3, 7, 2, 6, 5, 5, 1, 2, 1, 4, 5, 0, 4, 1, 3, 4, 0, 7, 4, 3, 5, 4, 7, 7, 6, 5];
       return this;  
      }


  //size - diagonal length
      octaeder(size){
        this.vert = [vert(vec3(0, size / 2, 0)), vert(vec3(-size / 2, 0, 0)), vert(vec3(size / 2, 0, 0)),
                     vert(vec3(0, 0, -size / 2)), vert(vec3(0, 0, size / 2)), vert(vec3(0, -size / 2, 0))];
        this.ind = [0, 4, 2, 2, 0, 3, 3, 1, 0, 0, 1, 4, 4, 1, 5, 4, 5, 2, 2, 5, 3, 3, 5, 1];
        return this;
       }
  } 

  function render(canvas) {
      return new _render(canvas);
    }

   class _render
   {
    constructor(canvas) {
      this.canvas = canvas;
      this.gl = this.canvas.getContext("webgl2");
      this.frameW = this.canvas.width;
      this.frameH = this.canvas.height;
      }
      
      camSet(camLoc, camAt, camUp, projSize, farClip) {
         this.cam = cam(camLoc, camAt, camUp, this.frameW, this.frameH);
         this.cam = this.cam.camSetProj(projSize, projSize, farClip);
         this.cam = this.cam.camSetSize(this.frameW, this.frameH);
      }

    init() {
      this.gl.clearColor(0.0, 0.0, 0.3, 1.0);
      this.gl.enable(this.gl.DEPTH_TEST);
    
      let fs_txt = 
      `#version 300 es
    precision highp float;
    out vec4 OutColor;
    in vec3 drawPos;
    in vec3 drawNormal;
    
    void main( void )
    {
      vec3 N = normalize(drawNormal);
      vec3 L = normalize(vec3(0.5, 0.4, 0.0));
      N = faceforward(N, normalize(drawPos), N);
      float k = dot(N, L);
      OutColor = vec4(drawNormal, 1.0);//vec4(k * vec3(0.0, 1.0, 1.0), 1.0);
    }
    `;

      let vs_txt = 
      `#version 300 es
    precision highp float;
    in vec3 InPosition;
    in vec3 InNormal;
    out vec3 drawPos;
    out vec3 drawNormal;
    uniform float Time;

    mat4 matrRotateY( float angle)
    {
      float a = angle / 180.0 * 3.14159265358979;
      return mat4(vec4(cos(a), 0.0, -sin(a), 0.0),
                  vec4(0.0, 1.0, 0.0, 0.0),
                  vec4(sin(a), 0.0, cos(a), 0.0),
                  vec4(0.0, 0.0, 0.0, 1.0));
    }

    void main( void )
    {
      mat4 W = mat4(vec4(1.0, 0.0, 0.0, 0.0),
                    vec4(0.0, 1.0, 0.0, 0.0),
                    vec4(0.0, 0.0, 1.0, 0.0),
                    vec4(0.0, 0.0, -4.0, 1.0));

      mat4 MatrW = matrRotateY(70.0 * Time), MatrWVP = MatrW * W, MatrWNormal = transpose(inverse(MatrW)); 
      gl_Position = MatrW * vec4(InPosition, 1.0);
      drawPos = (MatrWVP * vec4(InPosition, 1.0)).xyz;
      drawNormal = InNormal;
    }
    `;

      let vs = this.loadShader(this.gl.VERTEX_SHADER, vs_txt),
          fs = this.loadShader(this.gl.FRAGMENT_SHADER, fs_txt),
          prg = this.gl.createProgram();
      this.prg = prg;
      this.gl.attachShader(prg, vs);
      this.gl.attachShader(prg, fs);
      this.gl.linkProgram(prg);

      if (!this.gl.getProgramParameter(prg, this.gl.LINK_STATUS)) {
        let buf = this.gl.getProgramInfoLog(prg);  
        console.log("Program link fail: " + buf);
      }
       timeLoc = this.gl.getUniformLocation(prg, "Time");
       this.gl.useProgram(prg);
    };

    render() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
      const date = new Date();
      let Time =
        date.getMilliseconds() / 1000.0 +
        date.getSeconds() +
        date.getMinutes() * 60;

      if (timeLoc != -1){
        this.gl.uniform1f(timeLoc, Time);
       }
    };

    mainloop() {
      const draw = () => {
      this.render();
      this.primDraw(primitive("octaeder", 1.0), mat4());
      window.requestAnimationFrame(draw);
    };
    draw();
   };

    primDraw(prim, world)
    {
      prim.matw = mat4(prim.trans.mulMatr(world)),
      prim.wnormal = mat4(prim.matw.setInverse().setTranspose()),
      prim.wvp = mat4(prim.matw.mulMatr(this.cam.matrVP));
      prim.autoNormals();
      let vertexes = [];
      let normals = [];
  /*
      for (let i = 0; i < prim.vert.length; i++) {
        vertexes[i * 3] = prim.vert[i].p.x; 
        vertexes[i * 3 + 1] = prim.vert[i].p.y; 
        vertexes[i * 3 + 2] = prim.vert[i].p.z;
        normals[i * 3] = prim.vert[i].n.x; 
        normals[i * 3 + 1] = prim.vert[i].n.y; 
        normals[i * 3 + 2] = prim.vert[i].n.z;
      }
  */
      for (let i = 0; i < prim.ind.length; i++) {
        vertexes[i * 3] = prim.vert[prim.ind[i]].p.x; 
        vertexes[i * 3 + 1] = prim.vert[prim.ind[i]].p.y; 
        vertexes[i * 3 + 2] = prim.vert[prim.ind[i]].p.z;
        normals[i * 3] = prim.vert[prim.ind[i]].n.x; 
        normals[i * 3 + 1] = prim.vert[prim.ind[i]].n.y; 
        normals[i * 3 + 2] = prim.vert[prim.ind[i]].n.z;
      }

      const posLoc = this.gl.getAttribLocation(this.prg, "InPosition");
      let vertexArray = this.gl.createVertexArray();
      this.gl.bindVertexArray(vertexArray);
      let vertexBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertexes), this.gl.STATIC_DRAW);
      if (posLoc != -1) {
        this.gl.vertexAttribPointer(posLoc, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(posLoc);
      }

      const normLoc = this.gl.getAttribLocation(this.prg, "InNormal");
      let normalBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(normals), this.gl.STATIC_DRAW);
      if (normLoc != -1) {
        this.gl.vertexAttribPointer(normLoc, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(normLoc);
      }
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, vertexes.length);
      }

    
     loadShader(shaderType, shaderSource) {
      const shader = this.gl.createShader(shaderType);
      this.gl.shaderSource(shader, shaderSource);
      this.gl.compileShader(shader);
      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        let buf = this.gl.getShaderInfoLog(shader);
        console.log("Shader compile fail: " + buf);
      }
      return shader;
   }
  }

  function main() {
    const rnd = render(document.getElementById("MyCan"));
    rnd.init();
    rnd.camSet(vec3(0, 0, 1), vec3(0, 0, 0), vec3(0, 1, 0), 0.1, 1000);
    rnd.mainloop();
  }
   window.addEventListener('load', () => {
    main();
   });

  exports.main = main;

  return exports;

})({});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbWF0aC92ZWMuanMiLCIuLi9tYXRoL215bWF0aC5qcyIsIi4uL21hdGgvbWF0LmpzIiwiLi4vbWF0aC9jYW1lcmEuanMiLCIuLi9yZW5kZXIuanMiLCIuLi9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vdmVjdG9yIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZWMzKC4uLmFyZ3MpIHtcclxuICAgIHJldHVybiBuZXcgX3ZlYzMoLi4uYXJncyk7XHJcbn07IC8vIEVuZCBvZiAndmVjMycgZnVuY3Rpb25cclxuXHJcbi8vY2xhc3MgJ192ZWMzJ1xyXG5jbGFzcyBfdmVjMyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XHJcbiAgICAgICAgaWYgKHggPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgdGhpcy54ID0gMCwgdGhpcy55ID0gMCwgdGhpcy56ID0gMDtcclxuICAgICAgICBlbHNlICAgICAgIFxyXG4gICAgICAgICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgIGlmICh4LmxlbmdodCA9PSAzKVxyXG4gICAgICAgICAgICAgICB0aGlzLnggPSB4WzBdLCB0aGlzLnkgPSB4WzFdLCB0aGlzLnogPSB4WzJdO1xyXG4gICAgICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4LngsIHRoaXMueSA9IHgueSwgdGhpcy56ID0geC56O1xyXG4gICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICAgICAgaWYgKHkgPT0gdW5kZWZpbmVkIHx8IHogPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgIHRoaXMueCA9IHgsIHRoaXMueSA9IHgsIHRoaXMueiA9PSB4O1xyXG4gICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICB0aGlzLnggPXgsIHRoaXMueSA9IHksIHRoaXMueiA9IHo7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICBkb3Qodikge1xyXG4gICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2LnkgKyB0aGlzLnogKiB2Lno7XHJcbiAgICB9XHJcbiAgICBhZGQodil7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2ID09ICdudW1iZXInKVxyXG4gICAgICAgICAgcmV0dXJuIHZlYzModGhpcy54ICsgdiwgdGhpcy55ICsgdiwgdGhpcy56ICsgdik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgcmV0dXJuIHZlYzModGhpcy54ICsgdi54LCB0aGlzLnkgKyB2LnksIHRoaXMueiArIHYueik7IFxyXG4gICAgfVxyXG4gICAgIHN1Yih2KXtcclxuICAgICAgICBpZiAodHlwZW9mIHYgPT0gJ251bWJlcicpXHJcbiAgICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggLSB2LCB0aGlzLnkgLSB2LCB0aGlzLnogLSB2KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggLSB2LngsIHRoaXMueSAtIHYueSwgdGhpcy56IC0gdi56KTsgXHJcbiAgICAgIH1cclxuXHJcbiAgICBtdWxOdW0obil7XHJcbiAgICAgICAgcmV0dXJuIHZlYzModGhpcy54ICogbiwgdGhpcy55ICogbiwgdGhpcy56ICogbik7XHJcbiAgICB9XHJcblxyXG4gICAgbm9ybWFsaXNlKCkge1xyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLno7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGxlbiAhPSAwICYmIGxlbiAhPSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGVuID0gTWF0aC5zcXJ0KGxlbik7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAvIGxlbiwgdGhpcy55IC8gbGVuLCB0aGlzLnogLyBsZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzKTsgXHJcbiAgICB9XHJcblxyXG4gICAgY3Jvc3Modil7XHJcbiAgICAgIHJldHVybiB2ZWMzKCB0aGlzLnkgKiB2LnogLSB0aGlzLnogKiB2LnksIHRoaXMueiAqIHYueCAtIHRoaXMueCAqIHYueiwgdGhpcy54ICogdi55IC0gdGhpcy55ICogdi54KTsgXHJcbiAgfSBcclxufSAvL0VuZCBvZiBjbGFzcyAnX3ZlYzMnIiwiXHJcbmV4cG9ydCBmdW5jdGlvbiBEMlIoQSkge1xyXG4gICAgcmV0dXJuIEEgKiBNYXRoLlBJIC8gMTgwO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFIyRChBKSB7XHJcbiAgICByZXR1cm4gQSAqIDE4MCAvIE1hdGguUEk7XHJcbn1cclxuXHJcbiIsImltcG9ydCB7RDJSfSBmcm9tICcuL215bWF0aC5qcyc7XHJcbmltcG9ydCAqIGFzIHZlY3RvciBmcm9tICcuL3ZlYy5qcyc7XHJcblxyXG4vL21hdHJpeCBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0NCguLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gbmV3IF9tYXQ0KC4uLmFyZ3MpO1xyXG59IC8vRW5kIG9mICdtYXQ0JyBmdW5jdGlvblxyXG5cclxuLy9jbGFzcyAnX21hdDQnXHJcbmNsYXNzIF9tYXQ0IHtcclxuICAgIGNvbnN0cnVjdG9yKG0gPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKG0gPT0gbnVsbClcclxuICAgICAgICAgIHRoaXMubSA9IFtbMSwgMCwgMCwgMF0sIFswLCAxLCAwLCAwXSwgWzAsIDAsIDEsIDBdLCBbMCwgMCwgMCwgMV1dO1xyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBtID09ICdvYmplY3QnICYmIG0ubGVuZ2h0ID09IDQpXHJcbiAgICAgICAgICB0aGlzLm0gPSBtO1xyXG4gICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLm0gPSBtLm07XHJcbiAgICB9XHJcblxyXG4gICAgLy9UcmFuc2xhdGVcclxuICAgICAgIHNldFRyYW5zbGF0ZShkeCwgZHksIGR6KSB7XHJcbiAgICAgICAgICBpZiAoZHggPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBkeCA9IDAsIGR5ID0gMCwgZHogPSAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHggPT0gJ29iamVjdCcpXHJcbiAgICAgICAgICAgIGlmIChkeC5sZW5naHQgPT0gMylcclxuICAgICAgICAgICAgICBkeCA9IHhbMF0sIGR5ID0geFsxXSwgZHogPSB4WzJdO1xyXG4gICAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAgICAgIGR4ID0geC54LCBkeSA9IHgueSwgZHogPSB4Lno7XHJcbiAgICAgICAgICAgIGlmIChkeSA9PSB1bmRlZmluZWQgfHwgZHogPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgIGR4ID0gZHgsIGR5ID0gZHgsIGR6ID09IGR4O1xyXG4gICAgICAgICAgICB0aGlzLm0gPSBbWzEsIDAsIDAsIDBdLFswLCAxLCAwLCAwXSxbMCwgMCwgMSwgMF0sW2R4LCBkeSwgZHosIDFdXTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLy9UcmFuc3Bvc2VcclxuICAgIHNldFRyYW5zcG9zZSgpIHtcclxuICAgICAgICAgdGhpcy5tID0gW1t0aGlzLm1bMF1bMF0sIHRoaXMubVsxXVswXSwgdGhpcy5tWzJdWzBdLCB0aGlzLm1bM11bMF1dLCBbdGhpcy5tWzBdWzFdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzNdWzFdXSwgXHJcbiAgICAgICAgIFt0aGlzLm1bMF1bMl0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bM11bMl1dLCBbdGhpcy5tWzBdWzNdLCB0aGlzLm1bMV1bM10sIHRoaXMubVsyXVszXSwgdGhpcy5tWzNdWzNdXV07XHJcbiAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL011bCBtYXRyaXhcclxuICAgIG11bE1hdHIobSkge1xyXG4gICAgICAgIHRoaXMubSA9IFtbdGhpcy5tWzBdWzBdICogbS5tWzBdWzBdICsgdGhpcy5tWzBdWzFdICogbS5tWzFdWzBdICsgdGhpcy5tWzBdWzJdICogbS5tWzJdWzBdICsgdGhpcy5tWzBdWzNdICogbS5tWzNdWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5tWzBdWzBdICogbS5tWzBdWzFdICsgdGhpcy5tWzBdWzFdICogbS5tWzFdWzFdICsgdGhpcy5tWzBdWzJdICogbS5tWzJdWzFdICsgdGhpcy5tWzBdWzNdICogbS5tWzNdWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5tWzBdWzBdICogbS5tWzBdWzJdICsgdGhpcy5tWzBdWzFdICogbS5tWzFdWzJdICsgdGhpcy5tWzBdWzJdICogbS5tWzJdWzJdICsgdGhpcy5tWzBdWzNdICogbS5tWzNdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5tWzBdWzBdICogbS5tWzBdWzNdICsgdGhpcy5tWzBdWzFdICogbS5tWzFdWzNdICsgdGhpcy5tWzBdWzJdICogbS5tWzJdWzNdICsgdGhpcy5tWzBdWzNdICogbS5tWzNdWzNdXSxcclxuXHJcbiAgICAgICAgICAgICAgICAgIFt0aGlzLm1bMV1bMF0gKiBtLm1bMF1bMF0gKyB0aGlzLm1bMV1bMV0gKiBtLm1bMV1bMF0gKyB0aGlzLm1bMV1bMl0gKiBtLm1bMl1bMF0gKyB0aGlzLm1bMV1bM10gKiBtLm1bM11bMF0sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0gKiBtLm1bMF1bMV0gKyB0aGlzLm1bMV1bMV0gKiBtLm1bMV1bMV0gKyB0aGlzLm1bMV1bMl0gKiBtLm1bMl1bMV0gKyB0aGlzLm1bMV1bM10gKiBtLm1bM11bMV0sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0gKiBtLm1bMF1bMl0gKyB0aGlzLm1bMV1bMV0gKiBtLm1bMV1bMl0gKyB0aGlzLm1bMV1bMl0gKiBtLm1bMl1bMl0gKyB0aGlzLm1bMV1bM10gKiBtLm1bM11bMl0sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0gKiBtLm1bMF1bM10gKyB0aGlzLm1bMV1bMV0gKiBtLm1bMV1bM10gKyB0aGlzLm1bMV1bMl0gKiBtLm1bMl1bM10gKyB0aGlzLm1bMV1bM10gKiBtLm1bM11bM11dLFxyXG4gXHJcbiAgICAgICAgICAgICAgICAgIFt0aGlzLm1bMl1bMF0gKiBtLm1bMF1bMF0gKyB0aGlzLm1bMl1bMV0gKiBtLm1bMV1bMF0gKyB0aGlzLm1bMl1bMl0gKiBtLm1bMl1bMF0gKyB0aGlzLm1bMl1bM10gKiBtLm1bM11bMF0sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0gKiBtLm1bMF1bMV0gKyB0aGlzLm1bMl1bMV0gKiBtLm1bMV1bMV0gKyB0aGlzLm1bMl1bMl0gKiBtLm1bMl1bMV0gKyB0aGlzLm1bMl1bM10gKiBtLm1bM11bMV0sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0gKiBtLm1bMF1bMl0gKyB0aGlzLm1bMl1bMV0gKiBtLm1bMV1bMl0gKyB0aGlzLm1bMl1bMl0gKiBtLm1bMl1bMl0gKyB0aGlzLm1bMl1bM10gKiBtLm1bM11bMl0sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0gKiBtLm1bMF1bM10gKyB0aGlzLm1bMl1bMV0gKiBtLm1bMV1bM10gKyB0aGlzLm1bMl1bMl0gKiBtLm1bMl1bM10gKyB0aGlzLm1bMl1bM10gKiBtLm1bM11bM11dLFxyXG5cclxuICAgICAgICAgICAgICAgICBbdGhpcy5tWzNdWzBdICogbS5tWzBdWzBdICsgdGhpcy5tWzNdWzFdICogbS5tWzFdWzBdICsgdGhpcy5tWzNdWzJdICogbS5tWzJdWzBdICsgdGhpcy5tWzNdWzNdICogbS5tWzNdWzBdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0gKiBtLm1bMF1bMV0gKyB0aGlzLm1bM11bMV0gKiBtLm1bMV1bMV0gKyB0aGlzLm1bM11bMl0gKiBtLm1bMl1bMV0gKyB0aGlzLm1bM11bM10gKiBtLm1bM11bMV0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSAqIG0ubVswXVsyXSArIHRoaXMubVszXVsxXSAqIG0ubVsxXVsyXSArIHRoaXMubVszXVsyXSAqIG0ubVsyXVsyXSArIHRoaXMubVszXVszXSAqIG0ubVszXVsyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdICogbS5tWzBdWzNdICsgdGhpcy5tWzNdWzFdICogbS5tWzFdWzNdICsgdGhpcy5tWzNdWzJdICogbS5tWzJdWzNdICsgdGhpcy5tWzNdWzNdICogbS5tWzNdWzNdXV07XHJcblxyXG4gICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9OyAvL0VuZCBvZiAnbXVsbWF0cicgZnVuY3Rpb25cclxuXHJcbiAgICAvL0ludmVyc2VcclxuICAgIG1hdHJEZXRlcm0zeDMobTExLCBtMTIsIG0xMywgbTIxLCBtMjIsIG0yMywgbTMxLCBtMzIsIG0zMykge1xyXG4gICAgICAgcmV0dXJuIG0xMSAqIG0yMiAqIG0zMyArIG0xMiAqIG0yMyAqIG0zMSArIG0xMyAqIG0yMSAqIG0zMiAtIG0xMSAqIG0yMyAqIG0zMiAtIG0xMiAqIG0yMSAqIG0zMyAtIG0xMyAqIG0yMiAqIG0zMTtcclxuICAgICB9Oy8vRW5kIG9mICdNYXRyRGV0ZXJtM3gzJyBmdW5jdGlvbiBcclxuXHJcbiAgICAgbWF0ckRldGVybSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tWzBdWzBdICogdGhpcy5tYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgK1xyXG4gICAgICAgICAgICAgIC10aGlzLm1bMF1bMV0gKiB0aGlzLm1hdHJEZXRlcm0zeDModGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSArXHJcbiAgICAgICAgICAgICAgK3RoaXMubVswXVsyXSAqIHRoaXMubWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pICtcclxuICAgICAgICAgICAgICAtdGhpcy5tWzBdWzNdICogdGhpcy5tYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSk7XHJcbn0gLy8gRW5kIG9mICdtYXRyRGV0ZXJtJyBmdW5jdGlvbiBcclxuXHJcbiAgICBzZXRJbnZlcnNlKCkge1xyXG4gICAgICBsZXQgZGV0ID0gdGhpcy5tYXRyRGV0ZXJtKCk7XHJcbiAgICBcclxuICAgICAgaWYgKGRldCA9PSAwKVxyXG4gICAgICAgIHRoaXMubSA9IFtbMSwgMCwgMCwgMF0sIFswLCAxLCAwLCAwXSwgWzAsIDAsIDEsIDBdLCBbMCwgMCwgMCwgMV1dO1xyXG4gICAgICBlbHNlIHtcclxuICAgICAgdGhpcy5tWzBdWzBdID0gdGhpcy5tYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG4gICAgXHJcbiAgICAgIHRoaXMubVsxXVswXSA9IC10aGlzLm1hdHJEZXRlcm0zeDModGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuICAgIFxyXG4gICAgICB0aGlzLm1bMl1bMF0gPSB0aGlzLm1hdHJEZXRlcm0zeDModGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcbiAgICBcclxuICAgICAgdGhpcy5tWzNdWzBdID0gLXRoaXMubWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pIC8gZGV0O1xyXG4gICAgXHJcbiAgICAgIHRoaXMubVswXVsxXSA9IC10aGlzLm1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuICAgIFxyXG4gICAgICB0aGlzLm1bMV1bMV0gPSB0aGlzLm1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcbiAgICBcclxuICAgICAgdGhpcy5tWzJdWzFdID0gLXRoaXMubWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG4gICAgXHJcbiAgICAgIHRoaXMubVszXVsxXSA9IHRoaXMubWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuICAgIFxyXG4gICAgXHJcbiAgICAgIHRoaXMubVswXVsyXSA9IHRoaXMubWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuICAgXHJcbiAgICAgIHRoaXMubVsxXVsyXSA9IC10aGlzLm1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuICAgIFxyXG4gICAgICB0aGlzLm1bMl1bMl0gPSB0aGlzLm1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcbiAgICBcclxuICAgICAgdGhpcy5tWzNdWzJdID0gLXRoaXMubWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pIC8gZGV0O1xyXG4gICAgICAgXHJcbiAgICAgIHRoaXMubVswXVszXSA9IC10aGlzLm1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdKSAvIGRldDtcclxuICAgIFxyXG4gICAgICB0aGlzLm1bMV1bM10gPSB0aGlzLm1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcbiAgICBcclxuICAgICAgdGhpcy5tWzJdWzNdID0gLXRoaXMubWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG4gICBcclxuICAgICAgdGhpcy5tWzNdWzNdID0gdGhpcy5tYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0pIC8gZGV0O1xyXG4gICAgICB9IFxyXG4gICAgICByZXR1cm4gdGhpczsgXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAgbWF0clZpZXcobG9jLCBhdCwgdXAxKSB7XHJcbiAgICAgIGxldFxyXG4gICAgICAgZGlyID0gYXQuYWRkKGxvYy5tdWxOdW0oLTEpKS5ub3JtYWxpc2UoKSxcclxuICAgICAgIHJpZ2h0ID0gZGlyLmNyb3NzKHVwMSkubm9ybWFsaXNlKCksXHJcbiAgICAgICB1cCA9IHJpZ2h0LmNyb3NzKGRpcik7XHJcbiAgICAgICBcclxuICAgICAgIHRoaXMubSA9IFtbcmlnaHQueCwgdXAueCwgLWRpci54LCAwXSxcclxuICAgICAgICAgICAgICAgIFtyaWdodC55LCB1cC55LCAtZGlyLnksIDBdLFxyXG4gICAgICAgICAgICAgICAgW3JpZ2h0LnosIHVwLnosIC1kaXIueiwgMF0sXHJcbiAgICAgICAgICAgICAgICBbLWxvYy5kb3QocmlnaHQpLCAtbG9jLmRvdCh1cCksIGxvYy5kb3QoZGlyKSwgMV1dO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgICB9O1xyXG5cclxuICAgICBtYXRyRnJ1c3RydW0obCwgciwgdCwgYiwgbiwgZikge1xyXG4gICAgICB0aGlzLm0gPSBbWyAyICogbiAvIChyIC0gbCksIDAsIDAsIDAgXSxcclxuICAgICAgICAgICAgICAgWyAwLCAyICogIG4gLyAodCAtIGIpLCAwLCAwIF0sXHJcbiAgICAgICAgICAgICAgIFsgKHIgKyBsKSAvIChyIC0gbCksICh0ICsgYikgLyAodCAtIGIpLCAoZiArIG4pIC8gKG4gLSBmKSwgLTEgXSxcclxuICAgICAgICAgICAgICAgWyAwLCAwLCAyICogbiAqIGYgLyAobiAtIGYpLCAwXV07XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgIH07XHJcblxyXG4gICAgIG1hdHJSb3RhdGVYKGFuZ2xlKSB7XHJcbiAgICAgICAgbGV0IGEgPSBEMlIoYW5nbGUpO1xyXG4gICAgICAgIHRoaXMubSA9IFtbMSwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgIFswLCBNYXRoLmNvcyhhKSwgTWF0aC5zaW4oYSksIDBdLFxyXG4gICAgICAgICAgICAgICAgICBbMCwgLU1hdGguc2luKGEpLCBNYXRoLmNvcyhhKSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgIFswLCAwLCAwLCAxXV07XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAgbWF0clJvdGF0ZVkoYW5nbGUpIHtcclxuICAgICAgbGV0IGEgPSBEMlIoYW5nbGUpO1xyXG4gICAgICB0aGlzLm0gPSBbW01hdGguY29zKGEpLCAwLCAtTWF0aC5zaW4oYSksIDBdLFxyXG4gICAgICAgICAgICAgICAgWzAsIDEsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgW01hdGguc2luKGEpLCAwLCBNYXRoLmNvcyhhKSwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMV1dO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgICB9O1xyXG5cclxuICAgICBtYXRyUm90YXRlWihhbmdsZSkge1xyXG4gICAgICBsZXQgYSA9IEQyUihhbmdsZSk7XHJcbiAgICAgICB0aGlzLm0gPSBbW01hdGguY29zKGEpLCBNYXRoLnNpbihhKSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWy1NYXRoLnNpbihhKSwgTWF0aC5jb3MoYSksIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAxLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMV1dO1xyXG4gICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgfTtcclxuXHJcbiAgICAgbWF0clNjYWxlKHYpIHtcclxuICAgICAgdGhpcy5tID0gW1t2LngsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgWzAsIHYueSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMCwgdi56LCAwXSxcclxuICAgICAgICAgICAgICAgIFswLCAwLCAwLCAxXV07XHJcbiAgICAgIHJldHVybiB0aGlzOyAgICAgICAgXHJcbiAgICAgfTtcclxuXHJcbiAgICAgdG9BcnJheSgpIHtcclxuICAgICAgcmV0dXJuIFtdLmNvbmNhdCguLi50aGlzLm0pO1xyXG4gICAgIH07XHJcbiAgICB9IiwiaW1wb3J0ICogYXMgdmVjdG9yIGZyb20gJy4vdmVjLmpzJztcclxuaW1wb3J0ICogYXMgbWF0cml4IGZyb20gJy4vbWF0LmpzJztcclxuXHJcbi8vQ2FtZXJhIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW0obG9jLCBhdCwgdXAsIGZyYW1lVywgZnJhbWVIKSB7XHJcbiAgICByZXR1cm4gbmV3IF9jYW0obG9jLCBhdCwgdXAsIGZyYW1lVywgZnJhbWVIKTtcclxufTsgLy9FbmQgb2YgJ2NhbScgZnVuY3Rpb25cclxuXHJcbi8vY2xhc3MgJ19jYW0nXHJcbmNsYXNzIF9jYW0ge1xyXG4gICAgY29uc3RydWN0b3IobG9jLCBhdCwgdXAsIGZyYW1lVywgZnJhbWVIKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubG9jID0gdmVjdG9yLnZlYzMobG9jKTtcclxuICAgICAgICB0aGlzLmF0ID0gdmVjdG9yLnZlYzMoYXQpO1xyXG4gICAgICAgIHRoaXMubWF0clByb2ogPSBtYXRyaXgubWF0NCgpO1xyXG4gICAgICAgIHRoaXMubWF0clZpZXcgPSBtYXRyaXgubWF0NCgpLm1hdHJWaWV3KGxvYywgYXQsIHVwKTtcclxuICAgICAgICB0aGlzLm1hdHJWUCA9IHRoaXMubWF0clZpZXcubXVsTWF0cih0aGlzLm1hdHJQcm9qKTtcclxuICAgICAgICB0aGlzLmZyYW1lVyA9IGZyYW1lVztcclxuICAgICAgICB0aGlzLmZyYW1lSCA9IGZyYW1lSDtcclxuXHJcbiAgICAgICAgdGhpcy5yaWdodCA9IHZlY3Rvci52ZWMzKHRoaXMubWF0clZpZXcubVswXVswXSwgdGhpcy5tYXRyVmlldy5tWzFdWzBdLCB0aGlzLm1hdHJWaWV3Lm1bMl1bMF0pO1xyXG4gICAgICAgIHRoaXMudXAgPSB2ZWN0b3IudmVjMyh0aGlzLm1hdHJWaWV3Lm1bMF1bMV0sIHRoaXMubWF0clZpZXcubVsxXVsxXSwgdGhpcy5tYXRyVmlldy5tWzJdWzFdKTtcclxuICAgICAgICB0aGlzLmRpciA9IHZlY3Rvci52ZWMzKC10aGlzLm1hdHJWaWV3Lm1bMF1bMl0sLXRoaXMubWF0clZpZXcubVsxXVsyXSwgLXRoaXMubWF0clZpZXcubVsyXVsyXSk7XHJcbiAgICB9XHJcblxyXG4gICAgIGNhbVNldFByb2ooc2l6ZSwgZGlzdCwgZmFyQ2xpcCkge1xyXG4gICAgICAgICAgICBsZXQgcnggPSBzaXplLCByeSA9IHNpemU7XHJcbiAgICAgICAgICAgIHRoaXMucHJvalNpemUgPSBzaXplO1xyXG4gICAgICAgICAgICB0aGlzLnByb2pEaXN0ID0gZGlzdDtcclxuICAgICAgICAgICAgdGhpcy5mYXJDbGlwID0gZmFyQ2xpcDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyYW1lVyA+PSB0aGlzLmZyYW1lSClcclxuICAgICAgICAgICAgICAgIHJ4ICo9IHRoaXMuZnJhbWVXIC8gdGhpcy5mcmFtZUg7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJ5ICo9IHRoaXMuZnJhbWVIIC8gdGhpcy5mcmFtZVc7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndwID0gcng7XHJcbiAgICAgICAgICAgIHRoaXMuaHAgPSByeTtcclxuICAgICAgICAgICAgdGhpcy5tYXRyUHJvaiA9IHRoaXMubWF0clByb2oubWF0ckZydXN0cnVtKC1yeCAvIDIsIHJ4IC8gMiwgLXJ5IC8gMiwgcnkgLyAyLCB0aGlzLnByb2pEaXN0LCB0aGlzLmZhckNsaXApOyBcclxuICAgICAgICAgICAgdGhpcy5tYXRyVlAubXVsTWF0cih0aGlzLm1hdHJWaWV3LCB0aGlzLm1hdHJQcm9qKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH07IFxyXG5cclxuICAgICAgICBjYW1TZXRTaXplKGZyYW1lVywgZnJhbWVIKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVXID0gZnJhbWVXO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lSCA9IGZyYW1lSDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FtU2V0UHJvaigpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FtUmVzcG91bnNlKCl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIC8vRW5kIG9mICdfY2FtJyBjbGFzcyIsImltcG9ydCAqIGFzIHZlY3RvciBmcm9tICcuL21hdGgvdmVjLmpzJ1xyXG5pbXBvcnQgKiBhcyBjYW1lcmEgZnJvbSAnLi9tYXRoL2NhbWVyYS5qcydcclxuaW1wb3J0ICogYXMgbWF0cml4IGZyb20gJy4vbWF0aC9tYXQuanMnXHJcblxyXG4vL2xldCBtYXRyd0xvYywgbWF0cndub3JtTG9jLCBtYXRyd3ZwTG9jLCBcclxubGV0IHRpbWVMb2M7XHJcblxyXG5mdW5jdGlvbiB2ZXJ0KHBvcylcclxue1xyXG4gIHJldHVybiBuZXcgX3ZlcnRleChwb3MpO1xyXG59XHJcblxyXG5jbGFzcyBfdmVydGV4XHJcbiAge1xyXG4gICAgY29uc3RydWN0b3IocG9zKVxyXG4gICAge1xyXG4gICAgICB0aGlzLnAgPSBwb3M7XHJcbiAgICAgIHRoaXMubiA9IHZlY3Rvci52ZWMzKDAsIDAsIDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbmZ1bmN0aW9uIHByaW1pdGl2ZSh0eXBlLCBzaXplKVxyXG57XHJcbiAgcmV0dXJuIG5ldyBfcHJpbWl0aXZlKHR5cGUsIHNpemUpO1xyXG59XHJcblxyXG5jbGFzcyBfcHJpbWl0aXZlIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlLCBzaXplKXtcclxuICAgIHRoaXMudHJhbnMgPSBtYXRyaXgubWF0NCgpO1xyXG5cclxuICAgIGlmICh0eXBlID09ICd0ZXRyYWVkZXInKVxyXG4gICAgICByZXR1cm4gdGhpcy50ZXRyYWVkZXIoc2l6ZSk7XHJcbiAgICBlbHNlIGlmICh0eXBlID09ICdjdWJlJylcclxuICAgICAgcmV0dXJuIHRoaXMuY3ViZShzaXplKTtcclxuICAgIGVsc2UgaWYgKHR5cGUgPT0gJ29jdGFlZGVyJylcclxuICAgICAgcmV0dXJuIHRoaXMub2N0YWVkZXIoc2l6ZSk7XHJcbiAgICBlbHNlIGlmICh0eXBlID09ICdpY29zaWRlcicpXHJcbiAgICAgIHJldHVybiB0aGlzLmljb3NpZGVyKHNpemUpO1xyXG4gICAgZWxzZSBpZiAodHlwZSA9PSAnZGVkZWNhZGVyJylcclxuICAgICAgcmV0dXJuIHRoaXMuZGVkZWNhZGVyKHNpemUpO1xyXG4gICAgfVxyXG5cclxuICBhdXRvTm9ybWFscygpIHtcclxuICBsZXQgaTtcclxuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy52ZXJ0Lmxlbmd0aDsgaSsrKVxyXG4gICAgdGhpcy52ZXJ0W2ldLm4gPSB2ZWN0b3IudmVjMygwLCAwLCAwKTtcclxuXHJcbiAgZm9yIChpID0gMDsgaSA8IHRoaXMudmVydC5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgbGV0IHAwID0gdGhpcy52ZXJ0W2ldLnAsIHAxID0gdGhpcy52ZXJ0W2kgKyAxXS5wLCBwMiA9IHRoaXMudmVydFtpICsgMl0ucDtcclxuICAgIGxldCBOID0gKChwMS5zdWIocDApKS5jcm9zcyhwMi5zdWIocDApKSkubm9ybWFsaXNlKCk7XHJcblxyXG4gICAgdGhpcy52ZXJ0W2ldLm4gPSB0aGlzLnZlcnRbaV0ubi5hZGQoTik7XHJcbiAgICB0aGlzLnZlcnRbaSArIDFdLm4gPSB0aGlzLnZlcnRbaSArIDFdLm4uYWRkKE4pO1xyXG4gICAgdGhpcy52ZXJ0W2kgKyAyXS5uID0gdGhpcy52ZXJ0W2kgKyAyXS5uLmFkZChOKTtcclxuICB9XHJcbi8qXHJcbiAgZm9yIChpID0gMDsgaSA8IHRoaXMuaW5kLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICBsZXQgbjAgPSB0aGlzLmluZFtpXSwgbjEgPSB0aGlzLmluZFtpICsgMV0sIG4yID0gdGhpcy5pbmRbaSArIDJdO1xyXG4gICAgbGV0IHAwID0gdGhpcy52ZXJ0W24wXS5wLCBwMSA9IHRoaXMudmVydFtuMV0ucCwgcDIgPSB0aGlzLnZlcnRbbjJdLnA7XHJcbiAgICBsZXQgTiA9ICgocDEuc3ViKHAwKSkuY3Jvc3MocDIuc3ViKHAwKSkpLm5vcm1hbGlzZSgpO1xyXG5cclxuICAgIHRoaXMudmVydFtuMF0ubiA9IHRoaXMudmVydFtuMF0ubi5hZGQoTik7XHJcbiAgICB0aGlzLnZlcnRbbjFdLm4gPSB0aGlzLnZlcnRbbjFdLm4uYWRkKE4pO1xyXG4gICAgdGhpcy52ZXJ0W24yXS5uID0gdGhpcy52ZXJ0W24yXS5uLmFkZChOKTtcclxuICB9XHJcbiovXHJcbiAgZm9yIChpID0gMDsgaSA8IHRoaXMudmVydC5sZW5ndGg7IGkrKylcclxuICAgIHRoaXMudmVydFtpXS5uID0gdGhpcy52ZXJ0W2ldLm4ubm9ybWFsaXNlKCk7XHJcbiAgfVxyXG5cclxuICAgdGV0cmFlZGVyKHNpemUpXHJcbiAgICB7ICAgICAgbGV0IHNxcnQzID0gTWF0aC5zcXJ0KDMpLCBzcXJ0MjEgPSBNYXRoLnNxcnQoMjEpO1xyXG4gICAgICB0aGlzLnZlcnQgPSBbdmVydCh2ZWN0b3IudmVjMygwLCBzaXplICogc3FydDIxIC8gNiwgMCkpLCB2ZXJ0KHZlY3Rvci52ZWMzKDAsIDAsIHNpemUgKiBzcXJ0MyAvIDMpKSwgdmVydCh2ZWN0b3IudmVjMyhzaXplIC8gMiwgMCwgc2l6ZSAqIHNxcnQzIC8gNikpLCB2ZXJ0KHZlY3Rvci52ZWMzKC1zaXplIC8gMiwgMCwgc2l6ZSAqIHNxcnQzIC8gNikpXTtcclxuICAgICAgdGhpcy5pbmQgPSBbMiwgMSwgMCwgMCwgMywgMiwgMSwgMywgMCwgMywgMiwgMV07XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjdWJlKHNpemUpe1xyXG4gICAgICB0aGlzLnZlcnQgPSBbdmVydCh2ZWN0b3IudmVjMygtc2l6ZSAvIDIsIC1zaXplIC8gMiwgc2l6ZSAvIDIpKSwgdmVydCh2ZWN0b3IudmVjMygtc2l6ZSAvIDIsIHNpemUgLyAyLCBzaXplIC8gMikpLCB2ZXJ0KHZlY3Rvci52ZWMzKHNpemUgLyAyLCBzaXplIC8gMiwgc2l6ZSAvIDIpKSwgXHJcbiAgICAgICAgICAgICAgICAgICB2ZXJ0KHZlY3Rvci52ZWMzKHNpemUgLyAyLCBzaXplIC8gMiwgc2l6ZSAvIDIpKSwgdmVydCh2ZWN0b3IudmVjMyhzaXplIC8gMiwgLXNpemUgLyAyLCBzaXplIC8gMikpLCB2ZXJ0KHZlY3Rvci52ZWMzKC1zaXplIC8gMiwgLXNpemUgLyAyLCBzaXplIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgICAgdmVydCh2ZWN0b3IudmVjMygtc2l6ZSAvIDIsIHNpemUgLyAyLCBzaXplIC8gMikpLCB2ZXJ0KHZlY3Rvci52ZWMzKC1zaXplIC8gMiwgc2l6ZSAvIDIsIC1zaXplIC8gMikpLCB2ZXJ0KHZlY3Rvci52ZWMzKHNpemUgLyAyLCBzaXplIC8gMiwgLXNpemUgLyAyKSksXHJcbiAgICAgICAgICAgICAgICAgICB2ZXJ0KHZlY3Rvci52ZWMzKHNpemUgLyAyLCBzaXplIC8gMiwgLXNpemUgLyAyKSksIHZlcnQodmVjdG9yLnZlYzMoc2l6ZSAvIDIsIHNpemUgLyAyLCBzaXplIC8gMikpLCB2ZXJ0KHZlY3Rvci52ZWMzKC1zaXplIC8gMiwgc2l6ZSAvIDIsIHNpemUgLyAyKSksXHJcbiAgICAgICAgICAgICAgICAgICB2ZXJ0KHZlY3Rvci52ZWMzKC1zaXplIC8gMiwgLXNpemUgLyAyLCBzaXplIC8gMikpLCB2ZXJ0KHZlY3Rvci52ZWMzKC1zaXplIC8gMiwgLXNpemUgLyAyLCAtc2l6ZSAvIDIpKSwgdmVydCh2ZWN0b3IudmVjMyhzaXplIC8gMiwgLXNpemUgLyAyLCAtc2l6ZSAvIDIpKSwgXHJcbiAgICAgICAgICAgICAgICAgICB2ZXJ0KHZlY3Rvci52ZWMzKHNpemUgLyAyLCAtc2l6ZSAvIDIsIC1zaXplIC8gMikpLCB2ZXJ0KHZlY3Rvci52ZWMzKHNpemUgLyAyLCAtc2l6ZSAvIDIsIHNpemUgLyAyKSksIHZlcnQodmVjdG9yLnZlYzMoLXNpemUgLyAyLC1zaXplIC8gMiwgc2l6ZSAvIDIpKSxcclxuICAgICAgICAgICAgICAgICAgIHZlcnQodmVjdG9yLnZlYzMoc2l6ZSAvIDIsIC1zaXplIC8gMiwgc2l6ZSAvIDIpKSwgdmVydCh2ZWN0b3IudmVjMyhzaXplIC8gMiwgc2l6ZSAvIDIsIHNpemUgLyAyKSksIHZlcnQodmVjdG9yLnZlYzMoc2l6ZSAvIDIsIHNpemUgLyAyLCAtc2l6ZSAvIDIpKSxcclxuICAgICAgICAgICAgICAgICAgIHZlcnQodmVjdG9yLnZlYzMoc2l6ZSAvIDIsIHNpemUgLyAyLCAtc2l6ZSAvIDIpKSwgdmVydCh2ZWN0b3IudmVjMyhzaXplIC8gMiwgLXNpemUgLyAyLCAtc2l6ZSAvIDIpKSwgdmVydCh2ZWN0b3IudmVjMyhzaXplIC8gMiwgc2l6ZSAvIDIsLXNpemUgLyAyLCBzaXplIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgICAgdmVydCh2ZWN0b3IudmVjMygtc2l6ZSAvIDIsIC1zaXplIC8gMiwgc2l6ZSAvIDIpKSwgdmVydCh2ZWN0b3IudmVjMygtc2l6ZSAvIDIsIHNpemUgLyAyLCBzaXplIC8gMikpLCB2ZXJ0KHZlY3Rvci52ZWMzKC1zaXplIC8gMiwgc2l6ZSAvIDIsIC1zaXplIC8gMikpLCBcclxuICAgICAgICAgICAgICAgICAgIHZlcnQodmVjdG9yLnZlYzMoLXNpemUgLyAyLCBzaXplIC8gMiwgLXNpemUgLyAyKSksIHZlcnQodmVjdG9yLnZlYzMoLXNpemUgLyAyLCAtc2l6ZSAvIDIsIC1zaXplIC8gMikpLCB2ZXJ0KHZlY3Rvci52ZWMzKC1zaXplIC8gMiwgLXNpemUgLyAyLHNpemUgLyAyKSksXHJcbiAgICAgICAgICAgICAgICAgICB2ZXJ0KHZlY3Rvci52ZWMzKC1zaXplIC8gMiwgLXNpemUgLyAyLCAtc2l6ZSAvIDIpKSwgdmVydCh2ZWN0b3IudmVjMygtc2l6ZSAvIDIsIHNpemUgLyAyLCAtc2l6ZSAvIDIpKSwgdmVydCh2ZWN0b3IudmVjMyhzaXplIC8gMiwgc2l6ZSAvIDIsIC1zaXplIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgICAgdmVydCh2ZWN0b3IudmVjMyhzaXplIC8gMiwgc2l6ZSAvIDIsIC1zaXplIC8gMikpLCB2ZXJ0KHZlY3Rvci52ZWMzKHNpemUgLyAyLCAtc2l6ZSAvIDIsIC1zaXplIC8gMikpLCB2ZXJ0KHZlY3Rvci52ZWMzKC1zaXplIC8gMiwgLXNpemUgLyAyLCAtc2l6ZSAvIDIpKSxcclxuICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgdGhpcy5pbmQgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTksIDIwLCAyMSwgMjIsIDIzLCAyNCwgMjUsIDI2LCAyNywgMjgsIDI5LCAzMCwgMzEsIDMyLCAzMywgMzQsIDM1LCAzNl0vL3RoaXMuaW5kID0gW11bMywgMSwgMCwgMiwgMSwgMywgNywgNiwgMiwgMiwgMywgNywgMiwgNiwgNSwgNSwgMSwgMiwgMSwgNCwgNSwgMCwgNCwgMSwgMywgNCwgMCwgNywgNCwgMywgNSwgNCwgNywgNywgNiwgNV07XHJcbiAgICAgcmV0dXJuIHRoaXM7ICBcclxuICAgIH1cclxuXHJcblxyXG4vL3NpemUgLSBkaWFnb25hbCBsZW5ndGhcclxuICAgIG9jdGFlZGVyKHNpemUpe1xyXG4gICAgICB0aGlzLnZlcnQgPSBbdmVydCh2ZWN0b3IudmVjMygwLCBzaXplIC8gMiwgMCkpLCB2ZXJ0KHZlY3Rvci52ZWMzKC1zaXplIC8gMiwgMCwgMCkpLCB2ZXJ0KHZlY3Rvci52ZWMzKHNpemUgLyAyLCAwLCAwKSksXHJcbiAgICAgICAgICAgICAgICAgICB2ZXJ0KHZlY3Rvci52ZWMzKDAsIDAsIC1zaXplIC8gMikpLCB2ZXJ0KHZlY3Rvci52ZWMzKDAsIDAsIHNpemUgLyAyKSksIHZlcnQodmVjdG9yLnZlYzMoMCwgLXNpemUgLyAyLCAwKSldO1xyXG4gICAgICB0aGlzLmluZCA9IFswLCA0LCAyLCAyLCAwLCAzLCAzLCAxLCAwLCAwLCAxLCA0LCA0LCAxLCA1LCA0LCA1LCAyLCAyLCA1LCAzLCAzLCA1LCAxXTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgfVxyXG59IFxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihjYW52YXMpIHtcclxuICAgIHJldHVybiBuZXcgX3JlbmRlcihjYW52YXMpO1xyXG4gIH1cclxuXHJcbiBjbGFzcyBfcmVuZGVyXHJcbiB7XHJcbiAgY29uc3RydWN0b3IoY2FudmFzKSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIHRoaXMuZ2wgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2wyXCIpO1xyXG4gICAgdGhpcy5mcmFtZVcgPSB0aGlzLmNhbnZhcy53aWR0aDtcclxuICAgIHRoaXMuZnJhbWVIID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjYW1TZXQoY2FtTG9jLCBjYW1BdCwgY2FtVXAsIHByb2pTaXplLCBmYXJDbGlwKSB7XHJcbiAgICAgICB0aGlzLmNhbSA9IGNhbWVyYS5jYW0oY2FtTG9jLCBjYW1BdCwgY2FtVXAsIHRoaXMuZnJhbWVXLCB0aGlzLmZyYW1lSCk7XHJcbiAgICAgICB0aGlzLmNhbSA9IHRoaXMuY2FtLmNhbVNldFByb2oocHJvalNpemUsIHByb2pTaXplLCBmYXJDbGlwKTtcclxuICAgICAgIHRoaXMuY2FtID0gdGhpcy5jYW0uY2FtU2V0U2l6ZSh0aGlzLmZyYW1lVywgdGhpcy5mcmFtZUgpO1xyXG4gICAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgdGhpcy5nbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjMsIDEuMCk7XHJcbiAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpO1xyXG4gIFxyXG4gICAgbGV0IGZzX3R4dCA9IFxyXG4gICAgYCN2ZXJzaW9uIDMwMCBlc1xyXG4gICAgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xyXG4gICAgb3V0IHZlYzQgT3V0Q29sb3I7XHJcbiAgICBpbiB2ZWMzIGRyYXdQb3M7XHJcbiAgICBpbiB2ZWMzIGRyYXdOb3JtYWw7XHJcbiAgICBcclxuICAgIHZvaWQgbWFpbiggdm9pZCApXHJcbiAgICB7XHJcbiAgICAgIHZlYzMgTiA9IG5vcm1hbGl6ZShkcmF3Tm9ybWFsKTtcclxuICAgICAgdmVjMyBMID0gbm9ybWFsaXplKHZlYzMoMC41LCAwLjQsIDAuMCkpO1xyXG4gICAgICBOID0gZmFjZWZvcndhcmQoTiwgbm9ybWFsaXplKGRyYXdQb3MpLCBOKTtcclxuICAgICAgZmxvYXQgayA9IGRvdChOLCBMKTtcclxuICAgICAgT3V0Q29sb3IgPSB2ZWM0KGRyYXdOb3JtYWwsIDEuMCk7Ly92ZWM0KGsgKiB2ZWMzKDAuMCwgMS4wLCAxLjApLCAxLjApO1xyXG4gICAgfVxyXG4gICAgYDtcclxuXHJcbiAgICBsZXQgdnNfdHh0ID0gXHJcbiAgICBgI3ZlcnNpb24gMzAwIGVzXHJcbiAgICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XHJcbiAgICBpbiB2ZWMzIEluUG9zaXRpb247XHJcbiAgICBpbiB2ZWMzIEluTm9ybWFsO1xyXG4gICAgb3V0IHZlYzMgZHJhd1BvcztcclxuICAgIG91dCB2ZWMzIGRyYXdOb3JtYWw7XHJcbiAgICB1bmlmb3JtIGZsb2F0IFRpbWU7XHJcblxyXG4gICAgbWF0NCBtYXRyUm90YXRlWSggZmxvYXQgYW5nbGUpXHJcbiAgICB7XHJcbiAgICAgIGZsb2F0IGEgPSBhbmdsZSAvIDE4MC4wICogMy4xNDE1OTI2NTM1ODk3OTtcclxuICAgICAgcmV0dXJuIG1hdDQodmVjNChjb3MoYSksIDAuMCwgLXNpbihhKSwgMC4wKSxcclxuICAgICAgICAgICAgICAgICAgdmVjNCgwLjAsIDEuMCwgMC4wLCAwLjApLFxyXG4gICAgICAgICAgICAgICAgICB2ZWM0KHNpbihhKSwgMC4wLCBjb3MoYSksIDAuMCksXHJcbiAgICAgICAgICAgICAgICAgIHZlYzQoMC4wLCAwLjAsIDAuMCwgMS4wKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdm9pZCBtYWluKCB2b2lkIClcclxuICAgIHtcclxuICAgICAgbWF0NCBXID0gbWF0NCh2ZWM0KDEuMCwgMC4wLCAwLjAsIDAuMCksXHJcbiAgICAgICAgICAgICAgICAgICAgdmVjNCgwLjAsIDEuMCwgMC4wLCAwLjApLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlYzQoMC4wLCAwLjAsIDEuMCwgMC4wKSxcclxuICAgICAgICAgICAgICAgICAgICB2ZWM0KDAuMCwgMC4wLCAtNC4wLCAxLjApKTtcclxuXHJcbiAgICAgIG1hdDQgTWF0clcgPSBtYXRyUm90YXRlWSg3MC4wICogVGltZSksIE1hdHJXVlAgPSBNYXRyVyAqIFcsIE1hdHJXTm9ybWFsID0gdHJhbnNwb3NlKGludmVyc2UoTWF0clcpKTsgXHJcbiAgICAgIGdsX1Bvc2l0aW9uID0gTWF0clcgKiB2ZWM0KEluUG9zaXRpb24sIDEuMCk7XHJcbiAgICAgIGRyYXdQb3MgPSAoTWF0cldWUCAqIHZlYzQoSW5Qb3NpdGlvbiwgMS4wKSkueHl6O1xyXG4gICAgICBkcmF3Tm9ybWFsID0gSW5Ob3JtYWw7XHJcbiAgICB9XHJcbiAgICBgO1xyXG5cclxuICAgIGxldCB2cyA9IHRoaXMubG9hZFNoYWRlcih0aGlzLmdsLlZFUlRFWF9TSEFERVIsIHZzX3R4dCksXHJcbiAgICAgICAgZnMgPSB0aGlzLmxvYWRTaGFkZXIodGhpcy5nbC5GUkFHTUVOVF9TSEFERVIsIGZzX3R4dCksXHJcbiAgICAgICAgcHJnID0gdGhpcy5nbC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICB0aGlzLnByZyA9IHByZztcclxuICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHByZywgdnMpO1xyXG4gICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIocHJnLCBmcyk7XHJcbiAgICB0aGlzLmdsLmxpbmtQcm9ncmFtKHByZyk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJnLCB0aGlzLmdsLkxJTktfU1RBVFVTKSkge1xyXG4gICAgICBsZXQgYnVmID0gdGhpcy5nbC5nZXRQcm9ncmFtSW5mb0xvZyhwcmcpOyAgXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiUHJvZ3JhbSBsaW5rIGZhaWw6IFwiICsgYnVmKTtcclxuICAgIH1cclxuICAgICB0aW1lTG9jID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJnLCBcIlRpbWVcIik7XHJcbiAgICAgdGhpcy5nbC51c2VQcm9ncmFtKHByZyk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQgfCB0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQpXHJcbiAgXHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIGxldCBUaW1lID1cclxuICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwMDAuMCArXHJcbiAgICAgIGRhdGUuZ2V0U2Vjb25kcygpICtcclxuICAgICAgZGF0ZS5nZXRNaW51dGVzKCkgKiA2MDtcclxuXHJcbiAgICBpZiAodGltZUxvYyAhPSAtMSl7XHJcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFmKHRpbWVMb2MsIFRpbWUpO1xyXG4gICAgIH1cclxuICB9O1xyXG5cclxuICBtYWlubG9vcCgpIHtcclxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgdGhpcy5wcmltRHJhdyhwcmltaXRpdmUoXCJvY3RhZWRlclwiLCAxLjApLCBtYXRyaXgubWF0NCgpKTtcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XHJcbiAgfVxyXG4gIGRyYXcoKTtcclxuIH07XHJcblxyXG4gIHByaW1EcmF3KHByaW0sIHdvcmxkKVxyXG4gIHtcclxuICAgIHByaW0ubWF0dyA9IG1hdHJpeC5tYXQ0KHByaW0udHJhbnMubXVsTWF0cih3b3JsZCkpLFxyXG4gICAgcHJpbS53bm9ybWFsID0gbWF0cml4Lm1hdDQocHJpbS5tYXR3LnNldEludmVyc2UoKS5zZXRUcmFuc3Bvc2UoKSksXHJcbiAgICBwcmltLnd2cCA9IG1hdHJpeC5tYXQ0KHByaW0ubWF0dy5tdWxNYXRyKHRoaXMuY2FtLm1hdHJWUCkpO1xyXG4gICAgcHJpbS5hdXRvTm9ybWFscygpO1xyXG4gICAgbGV0IHZlcnRleGVzID0gW107XHJcbiAgICBsZXQgbm9ybWFscyA9IFtdO1xyXG4vKlxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmltLnZlcnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmVydGV4ZXNbaSAqIDNdID0gcHJpbS52ZXJ0W2ldLnAueDsgXHJcbiAgICAgIHZlcnRleGVzW2kgKiAzICsgMV0gPSBwcmltLnZlcnRbaV0ucC55OyBcclxuICAgICAgdmVydGV4ZXNbaSAqIDMgKyAyXSA9IHByaW0udmVydFtpXS5wLno7XHJcbiAgICAgIG5vcm1hbHNbaSAqIDNdID0gcHJpbS52ZXJ0W2ldLm4ueDsgXHJcbiAgICAgIG5vcm1hbHNbaSAqIDMgKyAxXSA9IHByaW0udmVydFtpXS5uLnk7IFxyXG4gICAgICBub3JtYWxzW2kgKiAzICsgMl0gPSBwcmltLnZlcnRbaV0ubi56O1xyXG4gICAgfVxyXG4qL1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmltLmluZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2ZXJ0ZXhlc1tpICogM10gPSBwcmltLnZlcnRbcHJpbS5pbmRbaV1dLnAueDsgXHJcbiAgICAgIHZlcnRleGVzW2kgKiAzICsgMV0gPSBwcmltLnZlcnRbcHJpbS5pbmRbaV1dLnAueTsgXHJcbiAgICAgIHZlcnRleGVzW2kgKiAzICsgMl0gPSBwcmltLnZlcnRbcHJpbS5pbmRbaV1dLnAuejtcclxuICAgICAgbm9ybWFsc1tpICogM10gPSBwcmltLnZlcnRbcHJpbS5pbmRbaV1dLm4ueDsgXHJcbiAgICAgIG5vcm1hbHNbaSAqIDMgKyAxXSA9IHByaW0udmVydFtwcmltLmluZFtpXV0ubi55OyBcclxuICAgICAgbm9ybWFsc1tpICogMyArIDJdID0gcHJpbS52ZXJ0W3ByaW0uaW5kW2ldXS5uLno7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcG9zTG9jID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByZywgXCJJblBvc2l0aW9uXCIpO1xyXG4gICAgbGV0IHZlcnRleEFycmF5ID0gdGhpcy5nbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG4gICAgdGhpcy5nbC5iaW5kVmVydGV4QXJyYXkodmVydGV4QXJyYXkpO1xyXG4gICAgbGV0IHZlcnRleEJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHZlcnRleEJ1ZmZlcik7XHJcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydGV4ZXMpLCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcclxuICAgIGlmIChwb3NMb2MgIT0gLTEpIHtcclxuICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHBvc0xvYywgMywgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xyXG4gICAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc0xvYyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgbm9ybUxvYyA9IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcmcsIFwiSW5Ob3JtYWxcIik7XHJcbiAgICBsZXQgbm9ybWFsQnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgbm9ybWFsQnVmZmVyKTtcclxuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShub3JtYWxzKSwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7XHJcbiAgICBpZiAobm9ybUxvYyAhPSAtMSkge1xyXG4gICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIobm9ybUxvYywgMywgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xyXG4gICAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KG5vcm1Mb2MpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nbC5kcmF3QXJyYXlzKHRoaXMuZ2wuVFJJQU5HTEVfU1RSSVAsIDAsIHZlcnRleGVzLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gIFxyXG4gICBsb2FkU2hhZGVyKHNoYWRlclR5cGUsIHNoYWRlclNvdXJjZSkge1xyXG4gICAgY29uc3Qgc2hhZGVyID0gdGhpcy5nbC5jcmVhdGVTaGFkZXIoc2hhZGVyVHlwZSk7XHJcbiAgICB0aGlzLmdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNoYWRlclNvdXJjZSk7XHJcbiAgICB0aGlzLmdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcclxuICAgIGlmICghdGhpcy5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCB0aGlzLmdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICBsZXQgYnVmID0gdGhpcy5nbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcik7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiU2hhZGVyIGNvbXBpbGUgZmFpbDogXCIgKyBidWYpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNoYWRlcjtcclxuIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyB2ZWN0b3IgZnJvbSAnLi9tYXRoL3ZlYy5qcydcclxuLy9pbXBvcnQgKiBhcyBzaGQgZnJvbSAnLi9zaGFkZXJzLmpzJ1xyXG4vL2ltcG9ydCAqIGFzIGJ1ZiBmcm9tICcuL2J1ZmZlcnMuanMnXHJcbmltcG9ydCAqIGFzIHJlbmRlciBmcm9tICcuL3JlbmRlci5qcydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xyXG4gIGNvbnN0IHJuZCA9IHJlbmRlci5yZW5kZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJNeUNhblwiKSk7XHJcbiAgcm5kLmluaXQoKTtcclxuICBybmQuY2FtU2V0KHZlY3Rvci52ZWMzKDAsIDAsIDEpLCB2ZWN0b3IudmVjMygwLCAwLCAwKSwgdmVjdG9yLnZlYzMoMCwgMSwgMCksIDAuMSwgMTAwMCk7XHJcbiAgcm5kLm1haW5sb29wKCk7XHJcbn07XHJcblxyXG4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgbWFpbigpO1xyXG4gfSk7XHJcbiAiXSwibmFtZXMiOlsidmVjdG9yLnZlYzMiLCJtYXRyaXgubWF0NCIsImNhbWVyYS5jYW0iLCJyZW5kZXIucmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7O0VBQUE7RUFDTyxTQUFTLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRTtFQUM5QixJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztFQUM5QixDQUNBO0VBQ0E7RUFDQSxNQUFNLEtBQUssQ0FBQztFQUNaLElBQUksV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3pCLFFBQVEsSUFBSSxDQUFDLElBQUksU0FBUztFQUMxQixVQUFVLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzdDO0VBQ0EsV0FBVyxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVE7RUFDbkMsYUFBYSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQztFQUM5QixlQUFlLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNEO0VBQ0EsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3pEO0VBQ0EsY0FBYyxJQUFJLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLFNBQVM7RUFDbEQsY0FBYyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNsRDtFQUNBLGNBQWMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDaEQsYUFBYTtBQUNiO0VBQ0EsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1gsS0FBSyxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3ZELEtBQUs7RUFDTCxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDVixRQUFRLElBQUksT0FBTyxDQUFDLElBQUksUUFBUTtFQUNoQyxVQUFVLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDMUQ7RUFDQSxVQUFVLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEUsS0FBSztFQUNMLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNYLFFBQVEsSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRO0VBQ2hDLFVBQVUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUMxRDtFQUNBLFVBQVUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRSxPQUFPO0FBQ1A7RUFDQSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7RUFDYixRQUFRLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDeEQsS0FBSztBQUNMO0VBQ0EsSUFBSSxTQUFTLEdBQUc7RUFDaEIsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUN0RTtFQUNBLFFBQVEsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0VBQ2hDLFFBQVE7RUFDUixZQUFZLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2pDLFlBQVksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztFQUNsRSxTQUFTO0VBQ1QsUUFBUSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUMxQixLQUFLO0FBQ0w7RUFDQSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDWixNQUFNLE9BQU8sSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUcsR0FBRztFQUNILENBQUM7O0VDeERNLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRTtFQUN2QixJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO0VBQzdCOztFQ0FBO0VBQ08sU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDOUIsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7RUFDOUIsQ0FBQztBQUNEO0VBQ0E7RUFDQSxNQUFNLEtBQUssQ0FBQztFQUNaLElBQUksV0FBVyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDMUIsUUFBUSxJQUFJLENBQUMsSUFBSSxJQUFJO0VBQ3JCLFVBQVUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM1RSxhQUFhLElBQUksT0FBTyxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQztFQUN0RCxVQUFVLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3JCO0VBQ0EsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDekIsS0FBSztBQUNMO0VBQ0E7RUFDQSxPQUFPLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUNoQyxVQUFVLElBQUksRUFBRSxJQUFJLFNBQVM7RUFDN0IsWUFBWSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUNuQyxlQUFlLElBQUksT0FBTyxDQUFDLElBQUksUUFBUTtFQUN2QyxZQUFZLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDO0VBQzlCLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUM7RUFDQSxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNDLFlBQVksSUFBSSxFQUFFLElBQUksU0FBUyxJQUFJLEVBQUUsSUFBSSxTQUFTO0VBQ2xELGNBQWMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBWSxDQUFDO0VBQ3pDLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RSxRQUFRLE9BQU8sSUFBSSxDQUFDO0VBQ3BCLEtBQUs7QUFDTDtFQUNBO0VBQ0EsSUFBSSxZQUFZLEdBQUc7RUFDbkIsU0FBUyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3SCxTQUFTLE9BQU8sSUFBSSxDQUFDO0VBQ3JCLEtBQUs7QUFDTDtFQUNBO0VBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFO0VBQ2YsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVILG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVILG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVILG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0g7RUFDQSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVILG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVILG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVILG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0g7RUFDQSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVILG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVILG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVILG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0g7RUFDQSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNILGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNILGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNILGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlIO0VBQ0EsT0FBTyxPQUFPLElBQUksQ0FBQztFQUNuQixLQUFLO0FBQ0w7RUFDQTtFQUNBLElBQUksYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0VBQy9ELE9BQU8sT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztFQUN4SCxNQUFNO0FBQ047RUFDQSxLQUFLLFVBQVUsR0FBRztFQUNsQixRQUFRLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN6RixpREFBaUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3pGLGlEQUFpRCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN6RixpREFBaUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3pGLGlEQUFpRCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN6RixpREFBaUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3pGLGlEQUFpRCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN6RixpREFBaUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3pGLGlEQUFpRCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNGLENBQUM7QUFDRDtFQUNBLElBQUksVUFBVSxHQUFHO0VBQ2pCLE1BQU0sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0VBQ2xDO0VBQ0EsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0VBQ2xCLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRSxXQUFXO0VBQ1gsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0VBQ3JFO0VBQ0EsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakYsc0JBQXNCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RCxzQkFBc0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7RUFDdEU7RUFDQSxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7RUFDckU7RUFDQSxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRixzQkFBc0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlELHNCQUFzQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztFQUN0RTtFQUNBLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pGLHNCQUFzQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUQsc0JBQXNCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0VBQ3RFO0VBQ0EsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0VBQ3JFO0VBQ0EsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakYsc0JBQXNCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RCxzQkFBc0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7RUFDdEU7RUFDQSxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7RUFDckU7RUFDQTtFQUNBLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRixxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztFQUNyRTtFQUNBLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pGLHNCQUFzQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUQsc0JBQXNCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0VBQ3RFO0VBQ0EsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0VBQ3JFO0VBQ0EsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakYsc0JBQXNCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RCxzQkFBc0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7RUFDdEU7RUFDQSxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRixzQkFBc0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlELHNCQUFzQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztFQUN0RTtFQUNBLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRixxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztFQUNyRTtFQUNBLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pGLHNCQUFzQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUQsc0JBQXNCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0VBQ3RFO0VBQ0EsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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QUM7QUFDN0I7RUFDQSxRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUdELElBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RHLFFBQVEsSUFBSSxDQUFDLEVBQUUsR0FBR0EsSUFBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkcsUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHQSxJQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0RyxLQUFLO0FBQ0w7RUFDQSxLQUFLLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtFQUNyQyxZQUFZLElBQUksRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDO0VBQ3JDLFlBQVksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7RUFDakMsWUFBWSxJQUFJLENBQUMsUUFBUSxHQUFHLElB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SUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNsQyxLQUFLO0FBQ0w7RUFDQSxFQUFFLFdBQVcsR0FBRztFQUNoQixFQUFFLElBQUksQ0FBQyxDQUFDO0VBQ1IsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtFQUN2QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHRCxJQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxQztFQUNBLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0VBQzVDLElBQUksSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlFLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQztBQUN6RDtFQUNBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuRCxHQUFHO0VBQ0g7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7RUFDdkMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztFQUNoRCxHQUFHO0FBQ0g7RUFDQSxHQUFHLFNBQVMsQ0FBQyxJQUFJO0VBQ2pCLElBQUksT0FBTyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzVELE1BQU0sSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQ0EsSUFBVyxDQUFDLENBQUMsRUFBRSxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLElBQVcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9NLE1BQU0sSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDdEQsTUFBTSxPQUFPLElBQUksQ0FBQztFQUNsQixLQUFLO0VBQ0w7RUFDQSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7RUFDZCxNQUFNLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUNBLElBQVcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDdkssbUJBQW1CLElBQUksQ0FBQ0EsSUFBVyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLElBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLElBQVcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN2SyxtQkFBbUIsSUFBSSxDQUFDQSxJQUFXLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDQSxJQUFXLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLElBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDeEssbUJBQW1CLElBQUksQ0FBQ0EsSUFBVyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLElBQVcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDdEssbUJBQW1CLElBQUksQ0FBQ0EsSUFBVyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDQSxJQUFXLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzNLLG1CQUFtQixJQUFJLENBQUNBLElBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3hLLG1CQUFtQixJQUFJLENBQUNBLElBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLElBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDQSxJQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3RLLG1CQUFtQixJQUFJLENBQUNBLElBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLElBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ2pMLG1CQUFtQixJQUFJLENBQUNBLElBQVcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3pLLG1CQUFtQixJQUFJLENBQUNBLElBQVcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLElBQVcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztFQUMxSyxtQkFBbUIsSUFBSSxDQUFDQSxJQUFXLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDQSxJQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzFLLG1CQUFtQixJQUFJLENBQUNBLElBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLElBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDMUssbUJBQW1CLENBQUM7RUFDcEIsTUFBTSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQztFQUNySixLQUFLLE9BQU8sSUFBSSxDQUFDO0VBQ2pCLEtBQUs7QUFDTDtBQUNBO0VBQ0E7RUFDQSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDQSxJQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLElBQVcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDQSxJQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDM0gsbUJBQW1CLElBQUksQ0FBQ0EsSUFBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNBLElBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBVyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlILE1BQU0sSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDMUYsTUFBTSxPQUFPLElBQUksQ0FBQztFQUNsQixNQUFNO0VBQ04sQ0FBQztBQUNEO0VBQ08sU0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFO0VBQy9CLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUMvQixHQUFHO0FBQ0g7RUFDQSxDQUFDLE1BQU0sT0FBTztFQUNkLENBQUM7RUFDRCxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUU7RUFDdEIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztFQUN6QixJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7RUFDL0MsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0VBQ3BDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztFQUNyQyxLQUFLO0VBQ0w7RUFDQSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO0VBQ3BELE9BQU8sSUFBSSxDQUFDLEdBQUcsR0FBR0UsR0FBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQzdFLE9BQU8sSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0VBQ25FLE9BQU8sSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNoRSxLQUFLO0FBQ0w7RUFDQSxFQUFFLElBQUksR0FBRztFQUNULElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDM0MsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0VBQ3ZDO0VBQ0EsSUFBSSxJQUFJLE1BQU07RUFDZCxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksQ0FBQyxDQUFDO0FBQ047RUFDQSxJQUFJLElBQUksTUFBTTtFQUNkLElBQUksQ0FBQztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDQUFDLENBQUM7QUFDTjtFQUNBLElBQUksSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7RUFDM0QsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUM7RUFDN0QsUUFBUSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztFQUN0QyxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0VBQ25CLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0VBQ2xDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0VBQ2xDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDN0I7RUFDQSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFO0VBQ2hFLE1BQU0sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUMvQyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEdBQUcsR0FBRyxDQUFDLENBQUM7RUFDL0MsS0FBSztFQUNMLEtBQUssT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0VBQ3ZELEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDN0IsR0FBRztBQUNIO0VBQ0EsRUFBRSxNQUFNLEdBQUc7RUFDWCxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBQztFQUN0RTtFQUNBLElBQUksTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztFQUM1QixJQUFJLElBQUksSUFBSTtFQUNaLE1BQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFHLE1BQU07RUFDckMsTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFO0VBQ3ZCLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUM3QjtFQUNBLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDdEIsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDdkMsTUFBTTtFQUNOLEdBQUc7QUFDSDtFQUNBLEVBQUUsUUFBUSxHQUFHO0VBQ2IsSUFBSSxNQUFNLElBQUksR0FBRyxNQUFNO0VBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0VBQ2xCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxFQUFFRCxJQUFXLEVBQUUsQ0FBQyxDQUFDO0VBQzdELElBQUksTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3ZDLElBQUc7RUFDSCxFQUFFLElBQUksRUFBRSxDQUFDO0VBQ1QsRUFBRTtBQUNGO0VBQ0EsRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUs7RUFDdEIsRUFBRTtFQUNGLElBQUksSUFBSSxDQUFDLElBQUksR0FBR0EsSUFBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3RELElBQUksSUFBSSxDQUFDLE9BQU8sR0FBR0EsSUFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7RUFDckUsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHQSxJQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0VBQy9ELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0VBQ3ZCLElBQUksSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0VBQ3RCLElBQUksSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0VBQ3JCO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUMsTUFBTSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkQsTUFBTSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3ZELE1BQU0sUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2RCxNQUFNLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsRCxNQUFNLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEQsTUFBTSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RELEtBQUs7QUFDTDtFQUNBLElBQUksTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO0VBQ3JFLElBQUksSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0VBQ2xELElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7RUFDekMsSUFBSSxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0VBQzlDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7RUFDM0QsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0VBQzlGLElBQUksSUFBSSxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUU7RUFDdEIsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUN6RSxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDOUMsS0FBSztBQUNMO0VBQ0EsSUFBSSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7RUFDcEUsSUFBSSxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0VBQzlDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7RUFDM0QsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0VBQzdGLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLEVBQUU7RUFDdkIsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUMxRSxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7RUFDL0MsS0FBSztFQUNMLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNuRSxLQUFLO0FBQ0w7RUFDQTtFQUNBLEdBQUcsVUFBVSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUU7RUFDeEMsSUFBSSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztFQUNwRCxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztFQUMvQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ2xDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUU7RUFDckUsTUFBTSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ2pELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxHQUFHLENBQUMsQ0FBQztFQUNqRCxLQUFLO0VBQ0wsSUFBSSxPQUFPLE1BQU0sQ0FBQztFQUNsQixFQUFFO0VBQ0Y7O0VDL1FPLFNBQVMsSUFBSSxHQUFHO0VBQ3ZCLEVBQUUsTUFBTSxHQUFHLEdBQUdFLE1BQWEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7RUFDOUQsRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7RUFDYixFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUNILElBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFQSxJQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRUEsSUFBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQzFGLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0VBQ2pCLENBQ0E7RUFDQSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsTUFBTTtFQUN2QyxFQUFFLElBQUksRUFBRSxDQUFDO0VBQ1QsRUFBRSxDQUFDOzs7Ozs7Ozs7OyJ9
