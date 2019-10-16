import operators from './operators';

describe('operators.equal', () => {
    const equal = operators.equal;
    describe('equal', () => {
        it('should return true if received and expected are strictly equal', () => {
            const received = 'abc';
            const expected = 'abc';
            const res = equal({ received, expected });
            expect(res).toBeTruthy();
        });
        it('should return false if received and expected are not strictly equal', () => {
            const received = 'abc';
            const expected = 'def';
            const res = equal({ received, expected });
            expect(res).toBeFalsy();
        });
        it('should return false if received is undefined and expected is a number !== 0', () => {
            const received = undefined;
            const expected = 11;
            const res = equal({ received, expected });
            expect(res).toBeFalsy();
        });
        it('should return true if received is undefined and expected is 0', () => {
            const received = undefined;
            const expected = 0;
            const res = equal({ received, expected });
            expect(res).toBeTruthy();
        });
        it('should return true if received is null and expected falsy', () => {
            const received = null;
            const expected = 0;
            const res = equal({ received, expected });
            expect(res).toBeTruthy();
        });
        it('should return false if received is null and expected truthy', () => {
            const received = null;
            const expected = 'truthy';
            const res = equal({ received, expected });
            expect(res).toBeFalsy();
        });
        it('should return true if received and expected stringfied are the same string', () => {
            const received = { some: 'obj' };
            const expected = { some: 'obj' };
            const res = equal({ received, expected });
            expect(res).toBeTruthy();
        });
        it('should return true if received and expected stringfied are NOT the same string', () => {
            const received = { some: 'obj' };
            const expected = { some: 'otherObj' };
            const res = equal({ received, expected });
            expect(res).toBeFalsy();
        });
        it('should return false if received is a function (we do not know why it would ever be a function, but just in case)', () => {
            const received = () => { };
            const res = equal({ received });
            expect(res).toBeFalsy();
        });
        it('should return false if received is a symbol (we do not know why it would ever be a symbol, but just in case)', () => {
            const received = Symbol('foo');
            const res = equal({ received });
            expect(res).toBeFalsy();
        });
    });
    describe('not.equal', () => {
        it('should return true if received and expected are strictly not equal', () => {
            const received = 'abc';
            const expected = 'def';
            const res = equal({ received, expected, not: true });
            expect(res).toBeTruthy();
        });
        it('should return false if received and expected are strictly equal', () => {
            const received = 'abc';
            const expected = 'abc';
            const res = equal({ received, expected, not: true });
            expect(res).toBeFalsy();
        });
        it('should return true if received is undefined', () => {
            const received = undefined;
            const expected = 'def';
            const res = equal({ received, expected, not: true });
            expect(res).toBeTruthy();
        });
        it('should return true if received is undefined and expected is a number !== 0', () => {
            const received = undefined;
            const expected = 11;
            const res = equal({ received, expected, not: true });
            expect(res).toBeTruthy();
        });
        it('should return false if received is undefined and expected is 0', () => {
            const received = undefined;
            const expected = 0;
            const res = equal({ received, expected, not: true });
            expect(res).toBeFalsy();
        });
        it('should return false if received is null and expected falsy', () => {
            const received = null;
            const expected = 0;
            const res = equal({ received, expected, not: true });
            expect(res).toBeFalsy();
        });
        it('should return true if received is null and expected truthy', () => {
            const received = null;
            const expected = 'truthy';
            const res = equal({ received, expected, not: true });
            expect(res).toBeTruthy();
        });
        it('should return false if received and expected stringfied are the same string', () => {
            const received = { some: 'obj' };
            const expected = { some: 'obj' };
            const res = equal({ received, expected, not: true });
            expect(res).toBeFalsy();
        });
        it('should return true if received and expected stringfied are NOT the same string', () => {
            const received = { some: 'obj' };
            const expected = { some: 'otherObj' };
            const res = equal({ received, expected, not: true });
            expect(res).toBeTruthy();
        });
        it('should return false if received is a function (we do not know why it would ever be a function, but just in case)', () => {
            const received = () => { };
            const res = equal({ received, not: true });
            expect(res).toBeTruthy();
        });
        it('should return false if received is a symbol (we do not know why it would ever be a symbol, but just in case)', () => {
            const received = Symbol('foo');
            const res = equal({ received, not: true });
            expect(res).toBeTruthy();
        });
    });
});

describe('operators.empty', () => {
    const empty = operators.empty;
    describe('empty', () => {
        it('should return true if received is null', () => {
            const received = null;
            const res = empty({ received });
            expect(res).toBeTruthy();
        });
        it('should return flase if received is null with not', () => {
            const received = null;
            const not = true;
            const res = empty({ received, not });
            expect(res).toBeFalsy();
        });
        it('should return true if received is an empty array', () => {
            const received = [];
            const res = empty({ received });
            expect(res).toBeTruthy();
        });
        it('should return false if received is an empty array with not', () => {
            const received = [];
            const not = true;
            const res = empty({ received, not });
            expect(res).toBeFalsy();
        });
        it('should return false if received is a non-empty array', () => {
            const received = ['a'];
            const res = empty({ received });
            expect(res).toBeFalsy();
        });
        it('should return true if received is a non-empty array with not', () => {
            const received = ['a'];
            const not = true;
            const res = empty({ received, not });
            expect(res).toBeTruthy();
        });
        it('should return true if received is an object without its own keys', () => {
            const received = {};
            const res = empty({ received });
            expect(res).toBeTruthy();
        });
        it('should return false if received is an object without its own keys with not', () => {
            const received = {};
            const not = true;
            const res = empty({ received, not });
            expect(res).toBeFalsy();
        });
        it('should return false if received is an object with its own keys', () => {
            const received = { foo: 'bar' };
            const res = empty({ received });
            expect(res).toBeFalsy();
        });
        it('should return true if received is an object with its own keys with not', () => {
            const received = { foo: 'bar' };
            const not = true;
            const res = empty({ received, not });
            expect(res).toBeTruthy();
        });
        it('should return true if received is an empty string', () => {
            const received = '';
            const res = empty({ received });
            expect(res).toBeTruthy();
        });
        it('should return false if received is an empty string with not', () => {
            const received = '';
            const not = true;
            const res = empty({ received, not });
            expect(res).toBeFalsy();
        });
        it('should return false if received is a non-empty string', () => {
            const received = 'hello world';
            const res = empty({ received });
            expect(res).toBeFalsy();
        });
        it('should return true if received is a non-empty string with not', () => {
            const received = 'hello world';
            const not = true;
            const res = empty({ received, not });
            expect(res).toBeTruthy();
        });
        it('should return false if received is a number, regardless of what number it is', () => {
            const numbers = [0, -1, 2, 3.14];
            numbers.forEach((received) => {
                const res = empty({ received });
                expect(res).toBeFalsy();
            });
        });
        it('should return true if received is a number, regardless of what number it is with not', () => {
            const numbers = [0, -1, 2, 3.14];
            const not = true;
            numbers.forEach((received) => {
                const res = empty({ received, not });
                expect(res).toBeTruthy();
            });
        });
        it('should return false if received is a boolean, true and false alike', () => {
            let received = true;
            let res = empty({ received });
            expect(res).toBeFalsy();
            received = false;
            res = empty({ received });
            expect(res).toBeFalsy();
        });
        it('should return true if received is a boolean, true and false alike with not', () => {
            let received = true;
            const not = true;
            let res = empty({ received, not });
            expect(res).toBeTruthy();
            received = false;
            res = empty({ received, not });
            expect(res).toBeTruthy();
        });
        it('should return true if received is undefined', () => {
            const received = undefined;
            const res = empty({ received });
            expect(res).toBe(true);
        });
        it('should return false if received is undefined with not', () => {
            const received = undefined;
            const not = true;
            const res = empty({ received, not });
            expect(res).toBeFalsy();
        });
        it('should return true if received is a function (we do not know why it would ever be a function, but just in case)', () => {
            const received = () => { };
            const res = empty({ received });
            expect(res).toBeTruthy();
        });
        it('should return false if received is a function with not(we do not know why it would ever be a function, but just in case) ', () => {
            const received = () => { };
            const not = true;
            const res = empty({ received, not });
            expect(res).toBeFalsy();
        });
        it('should return true if received is a symbol (we do not know why it would ever be a symbol, but just in case)', () => {
            const received = Symbol('foo');
            const res = empty({ received });
            expect(res).toBeTruthy();
        });
        it('should return false if received is a symbol with not(we do not know why it would ever be a symbol, but just in case)', () => {
            const received = Symbol('foo');
            const not = true;
            const res = empty({ received, not });
            expect(res).toBeFalsy();
        });
    });
    describe('not.empty', () => {
        it('should return false if received is null', () => {
            const received = null;
            const res = empty({ received, not: true });
            expect(res).toBeFalsy();
        });
        it('should return false if received is an empty array', () => {
            const received = [];
            const res = empty({ received, not: true });
            expect(res).toBeFalsy();
        });
        it('should return true if received is a non-empty array', () => {
            const received = ['a'];
            const res = empty({ received, not: true });
            expect(res).toBeTruthy();
        });
        it('should return false if received is an object without its own keys', () => {
            const received = {};
            const res = empty({ received, not: true });
            expect(res).toBeFalsy();
        });
        it('should return true if received is an object with its own keys', () => {
            const received = { foo: 'bar' };
            const res = empty({ received, not: true });
            expect(res).toBeTruthy();
        });
        it('should return false if received is an empty string', () => {
            const received = '';
            const res = empty({ received, not: true });
            expect(res).toBeFalsy();
        });
        it('should return true if received is a non-empty string', () => {
            const received = 'hello world';
            const res = empty({ received, not: true });
            expect(res).toBeTruthy();
        });
        it('should return true if received is a number, regardless of what number it is', () => {
            const numbers = [0, -1, 2, 3.14];
            numbers.forEach((received) => {
                const res = empty({ received, not: true });
                expect(res).toBeTruthy();
            });
        });
        it('should return true if received is a boolean, true and false alike', () => {
            let received = true;
            let res = empty({ received, not: true });
            expect(res).toBeTruthy();
            received = false;
            res = empty({ received, not: true });
            expect(res).toBeTruthy();
        });
        it('should return false if received is undefined', () => {
            const received = undefined;
            const res = empty({ received, not: true });
            expect(res).toBeFalsy();
        });
        it('should return false if received is a function (we do not know why it would ever be a function, but just in case)', () => {
            const received = () => { };
            const res = empty({ received, not: true });
            expect(res).toBeFalsy();
        });
        it('should return false if received is a symbol (we do not know why it would ever be a symbol, but just in case)', () => {
            const received = Symbol('foo');
            const res = empty({ received, not: true });
            expect(res).toBeFalsy();
        });
    });
});

describe('operators.match', () => {
    const match = operators.match;
    describe('match', () => {
        it('should return true if expected matches received case sensitively', () => {
            const received = 'https://www.some-domain.com/?Some=dummy&pageMatch';
            const expected = 'pageMatch';
            const res = match({ received, expected });
            expect(res).toBeTruthy();
        });
        it('should return false if expected doesn\'t match received case sensitively', () => {
            const received = 'https://www.some-domain.com/?Some=dummy&pageMatch';
            const expected = 'differentMatch';
            const res = match({ received, expected });
            expect(res).toBeFalsy();
        });
        it('should return true if one of expected matches received case sensitively', () => {
            const received = 'https://www.some-domain.com/?Some=dummy&pageMatch';
            const expected = 'pageMatch,anotherMatch';
            const res = match({ received, expected });
            expect(res).toBeTruthy();
        });
        it('should return false if received is undefined', () => {
            const received = undefined;
            const expected = 'pageMatch,anotherMatch';
            const res = match({ received, expected });
            expect(res).toBeFalsy();
        });
    });
    describe('not.match', () => {
        it('should return false if expected matches received case sensitively', () => {
            const received = 'https://www.some-domain.com/?Some=dummy&pageMatch';
            const expected = 'pageMatch';
            const res = match({ received, expected, not: true });
            expect(res).toBeFalsy();
        });
        it('should return true if expected doesn\'t match received case sensitively', () => {
            const received = 'https://www.some-domain.com/?Some=dummy&pageMatch';
            const expected = 'differentMatch';
            const res = match({ received, expected, not: true });
            expect(res).toBeTruthy();
        });
        it('should return false if expected matches received case sensitively', () => {
            const received = 'https://www.some-domain.com/?Some=dummy&pageMatch';
            const expected = 'pageMatch,anotherMatch';
            const res = match({ received, expected, not: true });
            expect(res).toBeFalsy();
        });
        it('should return true if received is undefined', () => {
            const received = undefined;
            const expected = 'pageMatch,anotherMatch';
            const res = match({ received, expected, not: true });
            expect(res).toBeTruthy();
        });
    });
});

describe('operators.greaterthan', () => {
    const greaterthan = operators.greaterthan;
    describe('greaterthan', () => {
        it('should return true if received is greater than expected', () => {
            const received = 2;
            const expected = 1;
            const res = greaterthan({ received, expected });
            expect(res).toBeTruthy();
        });
        it('should return false if received is not greater than expected', () => {
            const received = 1;
            const expected = 2;
            const res = greaterthan({ received, expected });
            expect(res).toBeFalsy();
        });
        it('should return false if received is undefined', () => {
            const received = undefined;
            const expected = 'def';
            const res = greaterthan({ received, expected });
            expect(res).toBeFalsy();
        });
    });
    describe('not.greaterthan', () => {
        it('should return true if received is not greater than expected', () => {
            const received = 1;
            const expected = 2;
            const res = greaterthan({ received, expected, not: true });
            expect(res).toBeTruthy();
        });
        it('should return false if received is greater than expected', () => {
            const received = 2;
            const expected = 1;
            const res = greaterthan({ received, expected, not: true });
            expect(res).toBeFalsy();
        });
        it('should return false if received is undefined', () => {
            const received = undefined;
            const expected = 'def';
            const res = greaterthan({ received, expected, not: true });
            expect(res).toBeFalsy();
        });
    });
});
