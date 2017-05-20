from math import sqrt

class Quadratic:
    def __init__(self, vertex, point):
        self.h = vertex[0]
        self.k = vertex[1]
        self.a = self.find_a(point[0], point[1], self.h, self.k)
        self.reset()

    def reset(self):
        self.current_x = 0
        self.old_y = 0
        self.x_change = 1

    def execute(self):
        self.current_x += self.x_change
        current_y = self.find_y(self.current_x, self.a, self.h, self.k)
        self.y_change = current_y - self.old_y
        self.old_y = current_y
        return self.y_change

    def reverse(self):
        self.x_change = -1

    def flip(self):
        self.current_x *= -1

    @staticmethod
    def find_a(x, y, h, k):
        return (y - k) / (x - h) ** 2

    @staticmethod
    def find_x(y, a, h, k):
        return sqrt((y - k) / a) + h

    @staticmethod
    def find_y(x, a, h, k):
        return a * (x - h) ** 2 + k
