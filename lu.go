package main

import (
	"os"
	"strconv"
	"bytes"
	"strings"
	"fmt"
)

func main() {
	b, _ := os.ReadFile("A.js")
	b, _, _ = bytes.Cut(b, []byte{10})
	b = b[7:len(b)-1]
	v := strings.Split(string(b), ",")
	fmt.Println("len v", len(v))
	A := make([][]complex128, 5)
	k := 0
	atof := func(s string) (f float64) { f, _ = strconv.ParseFloat(s, 64); return f }
	for i := range A {
		A[i] = make([]complex128, 7)
		for j := range A[i] {
			A[i][j] = complex(atof(v[k]), atof(v[1+k]))
			k += 2
		}
	}
	M("A", A)
	lub(A)
	M("B", A)
}
func V(s string, b []complex128) {
	fmt.Println(s)
	for _, u := range b {
		fmt.Printf(" %6.3f", u)
	}
	fmt.Println()
}
func M(s string, A [][]complex128) {
	fmt.Println(s)
	for i := range A {
		for _, a := range A[i] {
			fmt.Printf(" %6.3f", a)
		}
		fmt.Println()
	}
}
func lub(B [][]complex128) {
	m, n := len(B), len(B[0])
	h := (m-1)/2
	for j := range n {
		p := B[h][j]
		fmt.Println("a/b", h, j, real(p), imag(p))
		for k := 1+h; k<m; k++ {
			q := B[k][j]/p
			fmt.Println("p/q",k,real(q),imag(q))
			for i := 1; i<m; i++ {
				if h-i >= 0 && i+j < n {
					fmt.Println("Bij", k-i, j+i)
					B[k-i][j+i] -= q*B[h-i][j+i]
				}
			}
		fmt.Println("bkj", k, j, real(q), imag(q))
			B[k][j] = q
		}
	}
}
func lubsolve(A [][]complex128, rhs []complex128) (x []complex128) {
	n := len(A[0])
	m := len(A)
	h := (m-1)/2
	x = make([]complex128, n)
	copy(x, rhs)
	for i := range n {
		for k := i-h; k<i; k++ {
			j := i-k+h
			if j >= 0 && j < m && k >= 0{
				x[i] -= A[j][k] * x[k]
			}
		}
	}
	for i := n-1; i>= 0; i-- {
		for k := 1; k<=h; k++ {
			if h + k < m && i+k<n {
				x[i] -= A[h-k][i+k] * x[i+k]
			}
		}
		x[i] /= A[h][i]
	}
	return x
}
