import json
import numpy as np
import io

class Three_json(object):
    '''
    Class for producing a json file used for THree.js 3D representation of a numpy 2D array.
    Usage:
        * Instantiate the class
        * call the method : plot_shape_3d(Z) with Z being the numpy 2D array.
    '''
    def __init__(self, ampl=None):
        self.ampl = ampl # Amplitude for modifying the height.

    def example_0(self):
        '''
        Produces a 2D numpy dataset object Z[i,j]
        '''
        self.ampl = 50
        self.Nx = 300
        self.Ny = 300
        Z = np.empty((self.Nx, self.Ny))
        for i in range(self.Nx):
            for j in range(self.Ny):
                Z[i,j] = (np.sin(i*np.pi/float(self.Nx)*4)+np.sin(j*np.pi/float(self.Ny)*4))
        print (Z.shape)
        return Z

    def example_1(self):
        '''
        Produces a 2D numpy dataset object Z[i,j]
        '''
        self.ampl = 50
        self.Nx = 300
        self.Ny = 300
        Z = np.empty((self.Nx, self.Ny))
        for i in range(self.Nx):
            for j in range(self.Ny):
                Z[i,j] = (np.sin(i*np.pi/float(self.Nx)*4)*self.Nx/100.0+np.sin(j*np.pi/float(self.Ny)*4)*self.Ny/100.0)
        print (Z.shape)
        return Z

    def example_2(self):
        '''
        Produces a 2D numpy dataset object Z[i,j]
        '''
        self.ampl = 50
        self.Nx = 300
        self.Ny = 300
        Z = np.empty((self.Nx, self.Ny))
        for i in range(self.Nx):
            for j in range(self.Ny):
                Z[i,j] = 0.05*np.sin(i**2*np.pi/float(self.Nx)*4 + j**2*np.pi/float(self.Ny)*4)
        print (Z.shape)
        return Z

    def example_3(self):
        '''
        Produces a 2D numpy dataset object Z[i,j]
        '''
        N = 500
        sub = 50
        self.Nx = N
        self.Ny = N
        nbhill = 20
        low = 2*sub
        up = N-2*sub
        Z = np.empty((self.Nx, self.Ny))
        for n in range(nbhill):
            self.ampl = 10*np.random.randn()
            ri = np.random.randint(low,up)
            rj = np.random.randint(low,up)
            for i in range(sub):
                for j in range(sub):

                    Z[i+ri,j+rj] = self.ampl*(np.sin(2*i*np.pi/sub) + np.sin(2*j*np.pi/sub))

        return Z

    def example_4(self):
        '''
        Produces a 2D numpy dataset object Z[i,j]
        '''
        N = 500
        sub = 50
        self.Nx = N
        self.Ny = N
        nbpts = 20
        low = 2*sub
        up = N-2*sub
        Z = np.empty((self.Nx, self.Ny))
        pos = [100, 100]
        step = 6
        for n in range(nbpts):
            self.ampl = 3 # *np.random.randn()
            ri = np.random.randint(low,up)
            rj = np.random.randint(low,up)
            pos[0]+=step
            pos[1]+=step
            for i in range(sub):
                for j in range(sub):

                    Z[i+pos[0],j+pos[1]] = self.ampl*(np.sin(2*i*np.pi/sub) + np.sin(2*j*np.pi/sub))

        return Z

    def plot_shape_3d(self, Z):
        '''
        Makes the json file used by three-json.html for plotting a shape in 3D from a 2D numpy array containing the z values.
        Z : numpy 2D array containing the altitudes.
        '''
        data = [] # final json data
        dimx, dimy = Z.shape[0], Z.shape[1]
        xflat = np.array([np.arange(dimx) for i in range(dimy)]).flatten() # flattening x
        yflat = np.array([np.ones(dimx)*i for i in range(dimy)]).flatten() # flattening y
        zflat = self.ampl*Z.flatten()   # Heights with amplitude
        sizemat = xflat.size
        try:
            with io.open('3d.json', 'w', encoding ='utf-8') as f:
                  for i in range(sizemat):
                      data.append({'x':int(xflat[i]),'y':int(yflat[i]),'z': zflat[i] })
                  f.write(unicode('data = '))
                  f.write(unicode(json.dumps(data, ensure_ascii = False))) # write in file in json format.
        except:
            with io.open('3d.json', 'w') as f:
                  for i in range(sizemat):
                      data.append({'x':int(xflat[i]),'y':int(yflat[i]),'z': zflat[i] })
                  f.write('data = ')
                  f.write(json.dumps(data, ensure_ascii = False)) # write in file in json format.

if __name__=='__main__':
    tj = Three_json()
    tj.plot_shape_3d(tj.example_4())
